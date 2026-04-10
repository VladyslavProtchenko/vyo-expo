import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export interface OnboardingProfileData {
  age: number | null;
  weight: number | null;
  height: number | null;
  waist: number | null;
  hips: number | null;
  unit_system: 'metric' | 'imperial' | null;
}

export interface OnboardingMedicalData {
  start_menstruation: string | null;
  menstruation_duration: number | null;
  cycle_duration: number | null;
  flow: string | null;
  is_regular_period: string[] | null;
  diagnosed_conditions: string[] | null;
  symptoms: string[] | null;
  additional_symptoms: string[] | null;
  other_symptoms: string[] | null;
  is_pain: boolean | null;
  pain_type: string[] | null;
  pain_intensity: number | null;
  pain_period: string[] | null;
  pain_location: string[] | null;
  pain_duration: string | null;
  pain_case: string | null;
  is_medicine: string | null;
  is_pain_change: string | null;
  surgery: string | null;
  surgery_date: string | null;
}

export interface OnboardingData {
  profile: OnboardingProfileData | null;
  medical: OnboardingMedicalData | null;
}

export const useOnboardingData = () => {
  return useQuery({
    queryKey: ['onboarding-data'],
    queryFn: async (): Promise<OnboardingData> => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        throw new Error('Not authenticated');
      }

      const [profileRes, medicalRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('age, weight, height, waist, hips, unit_system')
          .eq('id', session.user.id)
          .single(),
        supabase
          .from('medical_data')
          .select('*')
          .eq('user_id', session.user.id)
          .single(),
      ]);

      if (profileRes.error && profileRes.error.code !== 'PGRST116') {
        throw profileRes.error;
      }

      if (medicalRes.error && medicalRes.error.code !== 'PGRST116') {
        throw medicalRes.error;
      }

      const profile: OnboardingProfileData | null = profileRes.data ? {
        age: profileRes.data.age,
        weight: profileRes.data.weight ? Number(profileRes.data.weight) : null,
        height: profileRes.data.height ? Number(profileRes.data.height) : null,
        waist: profileRes.data.waist ? Number(profileRes.data.waist) : null,
        hips: profileRes.data.hips ? Number(profileRes.data.hips) : null,
        unit_system: profileRes.data.unit_system as 'metric' | 'imperial' | null,
      } : null;

      const medical: OnboardingMedicalData | null = medicalRes.data ? {
        start_menstruation: medicalRes.data.start_menstruation,
        menstruation_duration: medicalRes.data.menstruation_duration,
        cycle_duration: medicalRes.data.cycle_duration,
        flow: medicalRes.data.flow,
        is_regular_period: medicalRes.data.is_regular_period || [],
        diagnosed_conditions: medicalRes.data.diagnosed_conditions || [],
        symptoms: medicalRes.data.symptoms || [],
        additional_symptoms: medicalRes.data.additional_symptoms || [],
        other_symptoms: medicalRes.data.other_symptoms || [],
        is_pain: medicalRes.data.is_pain,
        pain_type: medicalRes.data.pain_type || [],
        pain_intensity: medicalRes.data.pain_intensity,
        pain_period: medicalRes.data.pain_period || [],
        pain_location: medicalRes.data.pain_location || [],
        pain_duration: medicalRes.data.pain_duration,
        pain_case: medicalRes.data.pain_case,
        is_medicine: medicalRes.data.is_medicine,
        is_pain_change: medicalRes.data.is_pain_change,
        surgery: medicalRes.data.surgery,
        surgery_date: medicalRes.data.surgery_date,
      } : null;

      return { profile, medical };
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    refetchOnMount: 'always',
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_onboarding_data' } });
      Toast.show({
        type: 'error',
        text1: 'Failed to load data',
        text2: error.message || 'Please restart the app.',
      });
      return false;
    },
  });
};

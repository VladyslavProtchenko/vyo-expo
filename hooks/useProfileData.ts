import { supabase } from '@/config/supabase';
import useRegistrationStore from '@/store/useRegistrationStore';
import { useEffect, useState } from 'react';

interface SaveProfileResult {
  success: boolean;
  error?: string;
}

interface ProfileStatus {
  onboardingCompleted: boolean;
  loading: boolean;
}

export const useSaveProfile = () => {
  const [loading, setLoading] = useState(false);
  const profileData = useRegistrationStore();

  const saveProfileData = async (): Promise<SaveProfileResult> => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      // 1. Upsert (create or update) profile - handles both new and existing users
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: session.user.id,
          email: session.user.email || profileData.email,
          name: profileData.name,
          age: profileData.age,
          weight: profileData.weight,
          height: profileData.height,
          waist: profileData.waist,
          hips: profileData.hips,
          unit_system: profileData.unitSystem,
          onboarding_completed: true,
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Error upserting profile:', profileError);
        return { success: false, error: profileError.message };
      }

      // 2. Save medical data
      console.log('💾 Saving medical data:', {
        isMedicine: profileData.isMedicine,
        painType: profileData.painType,
        isPainChange: profileData.isPainChange,
      });

      const { error: medicalError } = await supabase
        .from('medical_data')
        .upsert({
          user_id: session.user.id,
          start_menstruation: profileData.startMenstruation,
          menstruation_duration: profileData.menstruationDuration,
          cycle_duration: profileData.cycleDuration,
          flow: profileData.flow || null,
          is_regular_period: profileData.isRegularPeriod,
          is_diagnosed: profileData.isDiagnosed,
          diagnosed_conditions: profileData.diagnoses,
          symptoms: profileData.symptoms,
          other_symptoms: profileData.otherSymptoms,
          is_pain: profileData.isPain,
          pain_type: profileData.painType || '',
          pain_intensity: profileData.intensity,
          pain_period: profileData.painPeriod || '',
          pain_location: profileData.painLocation,
          pain_duration: profileData.painDuration || '',
          pain_case: profileData.painCase || '',
          is_medicine: profileData.isMedicine || '',
          is_pain_change: profileData.isPainChange || '',
          surgery: profileData.surgery,
          surgery_date: profileData.surgeryDate || null,
        }, {
          onConflict: 'user_id'
        });

      if (medicalError) {
        console.error('Error saving medical data:', medicalError);
        return { success: false, error: medicalError.message };
      }

      profileData.setValue(true, 'finished');

      console.log('✅ Profile data saved successfully');
      return { success: true };
      
    } catch (error: any) {
      console.error('Error saving profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { saveProfileData, loading };
};

export const useSaveDiagnosis = () => {
  const [loading, setLoading] = useState(false);

  const saveDiagnosisResults = async (
    primaryScore: number,
    secondaryScore: number,
    menstrualPainScore: number,
    diagnosis: string
  ): Promise<SaveProfileResult> => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('diagnosis_results')
        .upsert({
          user_id: session.user.id,
          primary_score: primaryScore,
          secondary_score: secondaryScore,
          menstrual_pain_score: menstrualPainScore,
          diagnosis: diagnosis,
          calculated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving diagnosis results:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Diagnosis results saved successfully');
      return { success: true };
      
    } catch (error: any) {
      console.error('Error saving diagnosis:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { saveDiagnosisResults, loading };
};

export const useCheckOnboarding = (): ProfileStatus => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setOnboardingCompleted(false);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error checking onboarding status:', error);
          setOnboardingCompleted(false);
        } else {
          setOnboardingCompleted(data?.onboarding_completed || false);
        }
      } catch (error) {
        console.error('Error in checkOnboardingStatus:', error);
        setOnboardingCompleted(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  return { onboardingCompleted, loading };
};

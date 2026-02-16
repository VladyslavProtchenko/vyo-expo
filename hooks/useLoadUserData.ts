import { supabase } from '@/config/supabase';
import useUserStore from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';

export const useLoadUserData = () => {
  const { setUser } = useUserStore();

  return useQuery({
    queryKey: ['userData'],
    enabled: false, // Отключаем автоматическую загрузку, загружаем только по запросу
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const [profileRes, medicalRes, diagnosisRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', session.user.id).single(),
        supabase.from('medical_data').select('*').eq('user_id', session.user.id).single(),
        supabase.from('diagnosis_results').select('*').eq('user_id', session.user.id).single(),
      ]);

      if (profileRes.error) throw profileRes.error;

      const profile = profileRes.data;
      const medical = medicalRes.data;
      const diagnosis = diagnosisRes.data;

      setUser({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        waist: profile.waist,
        hips: profile.hips,
        unitSystem: profile.unit_system,
      });

      if (medical) {
        setUser({
          startMenstruation: medical.start_menstruation,
          menstruationDuration: medical.menstruation_duration,
          cycleDuration: medical.cycle_duration,
          flow: medical.flow,
          isRegularPeriod: medical.is_regular_period,
          diagnoses: medical.diagnosed_conditions,
          symptoms: medical.symptoms,
          otherSymptoms: medical.other_symptoms,
          isPain: medical.is_pain,
          painType: medical.pain_type,
          intensity: medical.pain_intensity,
          painPeriod: medical.pain_period,
          painLocation: medical.pain_location,
          painDuration: medical.pain_duration,
          painCase: medical.pain_case,
          isMedicine: medical.is_medicine,
          isPainChange: medical.is_pain_change,
          surgery: medical.surgery,
          surgeryDate: medical.surgery_date,
          isDiagnosed: medical.is_diagnosed,
        });
      }

      if (diagnosis) {
        setUser({
          diagnosis: diagnosis.diagnosis,
          primaryScore: diagnosis.primary_score,
          secondaryScore: diagnosis.secondary_score,
          menstrualPainScore: diagnosis.menstrual_pain_score,
        });
      }

      return { profile, medical, diagnosis };
    },
  });
};

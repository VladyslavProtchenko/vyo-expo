import { supabase } from '@/config/supabase';
import useProfileStore from '@/store/useProfileStore';
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
  const profileData = useProfileStore();

  const saveProfileData = async (): Promise<SaveProfileResult> => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error: dataError } = await supabase
        .from('user_data')
        .upsert({
          user_id: session.user.id,
          weight: profileData.weight,
          height: profileData.height,
          waist: profileData.waist,
          hips: profileData.hips,
          unit_system: profileData.unitSystem,
          start_menstruation: profileData.startMenstruation,
          menstruation_duration: profileData.menstruationDuration,
          cycle_duration: profileData.cycleDuration,
          initial_diagnoses: profileData.diagnoses,
          symptoms: profileData.symptoms,
          other_symptoms: profileData.otherSymptoms,
          flow: profileData.flow,
          is_regular_period: profileData.isRegularPeriod,
          is_pain: profileData.isPain,
          pain_type: profileData.painType,
          intensity: profileData.intensity,
          pain_period: profileData.painPeriod,
          pain_location: profileData.painLocation,
          pain_duration: profileData.painDuration,
          pain_case: profileData.painCase,
          is_medicine: profileData.isMedicine,
          is_pain_change: profileData.isPainChange,
          surgery: profileData.surgery,
          surgery_date: profileData.surgeryDate || null,
          is_diagnosed: profileData.isDiagnosed,
          finished: true,
        }, {
          onConflict: 'user_id'
        });

      if (dataError) {
        console.error('Error saving user data:', dataError);
        return { success: false, error: dataError.message };
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          onboarding_completed: true,
          name: profileData.name 
        })
        .eq('id', session.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return { success: false, error: profileError.message };
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

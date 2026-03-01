import { supabase } from '@/config/supabase';
import { useEffect, useState } from 'react';

interface SaveProfileResult {
  success: boolean;
  error?: string;
}

interface ProfileStatus {
  onboardingCompleted: boolean;
  loading: boolean;
}

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

export const useSavePartialQuiz = () => {
  const [loading, setLoading] = useState(false);

  const savePartialQuizData = async (currentStep: number): Promise<SaveProfileResult> => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({ 
          onboarding_completed: true,
          is_quiz_skipped: true,
          last_completed_quiz_step: currentStep,
        })
        .eq('id', session.user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
      
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { savePartialQuizData, loading };
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

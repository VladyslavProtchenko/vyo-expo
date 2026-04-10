import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

type DiagnosisValue = 'normal' | 'dysmenorrhea' | 'endometriosis' | 'pcos';
type PCOSType = 'high' | 'middle' | 'possible';

type DiagnosisPayload =
  | { diagnosis: Exclude<DiagnosisValue, 'pcos' | 'endometriosis'>; pcos_type?: never; endo_type?: never }
  | { diagnosis: 'pcos'; pcos_type: PCOSType; endo_type?: never }
  | { diagnosis: 'endometriosis'; endo_type?: number | null; is_endo_surgery?: boolean | null; is_endo_additional?: boolean | null; pcos_type?: never };

type DiagnosisData = {
  diagnosis: DiagnosisValue | null;
  pcos_type: PCOSType | null;
  endo_type: number | null;
  is_endo_surgery: boolean | null;
  is_endo_additional: boolean | null;
};

const QUERY_KEY = ['diagnosis'];

export const useGetDiagnosis = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('diagnosis')
        .select('diagnosis, pcos_type, endo_type, is_endo_surgery, is_endo_additional')
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;

      return data as DiagnosisData | null;
    },
  });
};

export const useUpdateDiagnosis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DiagnosisPayload) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('diagnosis')
        .upsert({ user_id: session.user.id, ...payload }, { onConflict: 'user_id' });

      if (error) throw error;

      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: (error: Error) => {
      Sentry.captureException(error, { tags: { action: 'update_diagnosis' } });
      Toast.show({ type: 'error', text1: 'Failed to save', text2: error.message || 'Please try again.' });
    },
  });
};

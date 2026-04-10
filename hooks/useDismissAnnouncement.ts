import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDismissAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (announcementId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_dismissed_announcements')
        .insert({
          user_id: session.user.id,
          announcement_id: announcementId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-announcement'] });
    },
    onError: (error: Error) => {
      Sentry.captureException(error, { tags: { action: 'dismiss_announcement' } });
    },
  });
};

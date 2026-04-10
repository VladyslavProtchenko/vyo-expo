import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useQuery } from '@tanstack/react-query';

interface Announcement {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
}

export const useGlobalAnnouncement = () => {
  return useQuery({
    queryKey: ['global-announcement'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data: activeAnnouncement, error: announcementError } = await supabase
        .from('announcements')
        .select('id, title, description, is_active')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (announcementError || !activeAnnouncement) return null;

      const { data: dismissed } = await supabase
        .from('user_dismissed_announcements')
        .select('announcement_id')
        .eq('user_id', session.user.id)
        .eq('announcement_id', activeAnnouncement.id)
        .single();

      if (dismissed) return null;

      return activeAnnouncement as Announcement;
    },
    staleTime: 5 * 60 * 1000,
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_announcement' } });
      return false;
    },
  });
};

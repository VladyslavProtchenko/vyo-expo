CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_dismissed_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  dismissed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, announcement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_dismissed_announcements_user_id ON user_dismissed_announcements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_dismissed_announcements_announcement_id ON user_dismissed_announcements(announcement_id);
CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON announcements(is_active);

INSERT INTO announcements (title, description, is_active) 
VALUES (
  'We noticed you had less than 6 hours of sleep last night.',
  'During menstruation, your body needs more recovery. Lack of sleep can increase fatigue, pain, and sensitivity. If you can, try going to bed a bit earlier.',
  true
);

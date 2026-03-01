-- Add quiz skipped flag and last completed step to profiles table
-- This allows users to resume quiz from where they left off

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_quiz_skipped BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS last_completed_quiz_step INTEGER DEFAULT 0 NOT NULL;

-- Add comments
COMMENT ON COLUMN public.profiles.is_quiz_skipped IS 'Indicates if user skipped the onboarding questionnaire';
COMMENT ON COLUMN public.profiles.last_completed_quiz_step IS 'Last completed quiz step number (0-11), used to resume quiz from this point';

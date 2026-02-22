-- Remove date_of_birth column from profiles table
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS date_of_birth;

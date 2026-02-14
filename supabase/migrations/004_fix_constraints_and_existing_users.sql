-- Fix is_medicine constraint to allow all possible values
ALTER TABLE public.medical_data 
DROP CONSTRAINT IF EXISTS medical_data_is_medicine_check;

ALTER TABLE public.medical_data 
ADD CONSTRAINT medical_data_is_medicine_check 
CHECK (is_medicine IN ('', 'Well relieve', 'Weel relieve', 'Partially help', 'Don''t help', 'Don''t use them', 'Helps'));

-- Create profiles for existing users who don't have one
INSERT INTO public.profiles (id, email, name)
SELECT 
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data->>'name', '')
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

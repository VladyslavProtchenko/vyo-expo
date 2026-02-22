-- Add additional_symptoms column to medical_data table
-- This field stores additional symptoms selected in step 4 of onboarding

ALTER TABLE public.medical_data
ADD COLUMN IF NOT EXISTS additional_symptoms TEXT[] DEFAULT '{}';

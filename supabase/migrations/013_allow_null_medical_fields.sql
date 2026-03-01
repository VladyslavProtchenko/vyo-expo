-- Allow NULL values for all optional medical data fields
-- Users who skip quiz may not have filled these fields yet

ALTER TABLE public.medical_data 
DROP CONSTRAINT IF EXISTS medical_data_flow_check,
DROP CONSTRAINT IF EXISTS medical_data_pain_type_check,
DROP CONSTRAINT IF EXISTS medical_data_pain_period_check,
DROP CONSTRAINT IF EXISTS medical_data_pain_duration_check,
DROP CONSTRAINT IF EXISTS medical_data_pain_case_check,
DROP CONSTRAINT IF EXISTS medical_data_is_medicine_check,
DROP CONSTRAINT IF EXISTS medical_data_is_pain_change_check;

-- Add back constraints that allow NULL
ALTER TABLE public.medical_data
ADD CONSTRAINT medical_data_flow_check 
  CHECK (flow IS NULL OR flow IN ('Light / Spotting', 'Medium', 'Moderately elevated', 'Heavy / Clots')),
ADD CONSTRAINT medical_data_pain_type_check 
  CHECK (pain_type IS NULL OR pain_type IN ('', 'Cramping', 'Aching', 'Sharp', 'Dull')),
ADD CONSTRAINT medical_data_pain_period_check 
  CHECK (pain_period IS NULL OR pain_period IN ('', 'Before period', 'During period', 'Ovulation', 'Not phase-dependent', 'Inconsistent')),
ADD CONSTRAINT medical_data_pain_duration_check 
  CHECK (pain_duration IS NULL OR pain_duration IN ('', 'Few hours', '1-2 days', '>2 days')),
ADD CONSTRAINT medical_data_pain_case_check 
  CHECK (pain_case IS NULL OR pain_case IN ('', 'Physical activity', 'Intercourse', 'Bowel movement', 'Urination', 'No connection with actions')),
ADD CONSTRAINT medical_data_is_medicine_check 
  CHECK (is_medicine IS NULL OR is_medicine IN ('', 'Well relieve', 'Weel relieve', 'Partially help', 'Don''t help', 'Don''t use them', 'Helps')),
ADD CONSTRAINT medical_data_is_pain_change_check 
  CHECK (is_pain_change IS NULL OR is_pain_change IN ('', 'No', 'A little', 'Nocitably', 'Strongly', 'The pain is new'));

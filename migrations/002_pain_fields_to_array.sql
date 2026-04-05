-- Migration: Change pain_period and pain_type columns from text to text[]
-- Steps 7 and 8 of onboarding now allow multiple selections
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  constraint_name text;
BEGIN
  -- Drop all CHECK constraints on medical_data that reference pain_period or pain_type
  FOR constraint_name IN
    SELECT c.conname
    FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'medical_data'
      AND c.contype = 'c'
      AND pg_get_constraintdef(c.oid) ~* 'pain_period|pain_type'
  LOOP
    EXECUTE format('ALTER TABLE medical_data DROP CONSTRAINT IF EXISTS %I', constraint_name);
  END LOOP;

  -- Convert pain_period хоtext -> text[]
  IF (
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'medical_data' AND column_name = 'pain_period'
  ) = 'text' THEN
    ALTER TABLE medical_data
      ALTER COLUMN pain_period TYPE text[]
      USING CASE WHEN pain_period IS NULL THEN NULL ELSE ARRAY[pain_period] END;
  END IF;

  -- Convert pain_type text -> text[]
  IF (
    SELECT data_type FROM information_schema.columns
    WHERE table_name = 'medical_data' AND column_name = 'pain_type'
  ) = 'text' THEN
    ALTER TABLE medical_data
      ALTER COLUMN pain_type TYPE text[]
      USING CASE WHEN pain_type IS NULL THEN NULL ELSE ARRAY[pain_type] END;
  END IF;
END $$;

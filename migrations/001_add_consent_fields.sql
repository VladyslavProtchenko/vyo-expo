-- Migration: Add consent tracking fields to profiles table
-- GDPR Article 7(1) requires proof that the data subject has consented
-- Run this in Supabase SQL Editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS privacy_accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS consent_version text;

-- Add comment for documentation
COMMENT ON COLUMN profiles.terms_accepted_at IS 'Timestamp when user accepted Terms & Conditions (GDPR Article 7)';
COMMENT ON COLUMN profiles.privacy_accepted_at IS 'Timestamp when user gave explicit consent to personal data processing (GDPR Article 7, Article 9)';
COMMENT ON COLUMN profiles.consent_version IS 'Version of the Privacy Policy that was accepted (date-based, e.g. 2026-03-06)';

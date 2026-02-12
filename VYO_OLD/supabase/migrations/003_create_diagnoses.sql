-- Create diagnoses table for calculated diagnosis results
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  diagnosis_type TEXT NOT NULL CHECK (diagnosis_type IN ('Primary dysmenorrhea', 'Secondary dysmenorrhea', 'Menstrual pain')),
  
  primary_score INTEGER NOT NULL DEFAULT 0,
  secondary_score INTEGER NOT NULL DEFAULT 0,
  menstrual_pain_score INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own diagnosis"
  ON diagnoses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diagnosis"
  ON diagnoses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diagnosis"
  ON diagnoses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diagnosis"
  ON diagnoses FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_diagnoses_updated_at
  BEFORE UPDATE ON diagnoses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_diagnoses_user_id ON diagnoses(user_id);


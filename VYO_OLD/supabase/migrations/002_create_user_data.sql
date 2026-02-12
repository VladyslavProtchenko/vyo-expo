-- Create user_data table for health and physical data
CREATE TABLE user_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Physical measurements
  weight NUMERIC(6, 2),
  height NUMERIC(6, 2),
  waist NUMERIC(6, 2),
  hips NUMERIC(6, 2),
  unit_system TEXT CHECK (unit_system IN ('metric', 'imperial')) DEFAULT 'metric',
  
  -- Menstrual cycle
  start_menstruation DATE,
  menstruation_duration INTEGER,
  cycle_duration INTEGER,
  
  -- Initial diagnoses from user (before calculation)
  initial_diagnoses TEXT[],
  
  -- Symptoms
  symptoms TEXT[],
  other_symptoms TEXT[],
  
  -- Menstrual flow
  flow TEXT CHECK (flow IN ('Light / Spotting', 'Medium', 'Heavy / Clots')),
  is_regular_period TEXT[],
  
  -- Pain information
  is_pain BOOLEAN,
  pain_type TEXT,
  intensity INTEGER CHECK (intensity >= 0 AND intensity <= 10),
  pain_period TEXT,
  pain_location TEXT[],
  pain_duration TEXT,
  pain_case TEXT,
  is_medicine TEXT,
  is_pain_change TEXT,
  
  -- Surgery information
  surgery TEXT,
  surgery_date DATE,
  
  -- Flags
  is_diagnosed BOOLEAN DEFAULT FALSE,
  finished BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON user_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
  ON user_data FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own data"
  ON user_data FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_data_updated_at
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_user_data_user_id ON user_data(user_id);


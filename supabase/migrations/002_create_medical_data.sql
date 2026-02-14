-- Create Medical Data Table
-- This table stores all medical information collected during onboarding

CREATE TABLE public.medical_data (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Menstrual cycle information
    start_menstruation DATE,
    menstruation_duration INTEGER DEFAULT 5,
    cycle_duration INTEGER DEFAULT 28,
    flow TEXT CHECK (flow IN ('Light / Spotting', 'Medium', 'Moderately elevated', 'Heavy / Clots')),
    is_regular_period TEXT[] DEFAULT '{}',
    
    -- Diagnoses
    is_diagnosed BOOLEAN DEFAULT false,
    diagnosed_conditions TEXT[] DEFAULT '{}',
    
    -- Symptoms
    symptoms TEXT[] DEFAULT '{}',
    other_symptoms TEXT[] DEFAULT '{}',
    
    -- Pain information
    is_pain BOOLEAN,
    pain_type TEXT CHECK (pain_type IN ('', 'Cramping', 'Aching', 'Sharp', 'Dull')),
    pain_intensity INTEGER CHECK (pain_intensity >= 0 AND pain_intensity <= 10),
    pain_period TEXT CHECK (pain_period IN ('', 'Before period', 'During period', 'Ovulation', 'Not phase-dependent', 'Inconsistent')),
    pain_location TEXT[] DEFAULT '{}',
    pain_duration TEXT CHECK (pain_duration IN ('', 'Few hours', '1-2 days', '>2 days')),
    pain_case TEXT CHECK (pain_case IN ('', 'Physical activity', 'Intercourse', 'Bowel movement', 'Urination', 'No connection with actions')),
    is_medicine TEXT CHECK (is_medicine IN ('', 'Well relieve', 'Weel relieve', 'Partially help', 'Don''t help')),
    is_pain_change TEXT CHECK (is_pain_change IN ('', 'No', 'A little', 'Nocitably', 'Strongly', 'The pain is new')),
    
    -- Surgery information
    surgery TEXT,
    surgery_date DATE,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one record per user
    UNIQUE(user_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_medical_data_user_id ON public.medical_data(user_id);

-- Enable Row Level Security
ALTER TABLE public.medical_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own medical data"
    ON public.medical_data
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medical data"
    ON public.medical_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical data"
    ON public.medical_data
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medical data"
    ON public.medical_data
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_medical_data_updated_at
    BEFORE UPDATE ON public.medical_data
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

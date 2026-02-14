-- Create Diagnosis Results Table
-- This table stores calculated diagnosis results based on user's medical data

CREATE TABLE public.diagnosis_results (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Diagnosis scores
    primary_score INTEGER DEFAULT 0 NOT NULL,
    secondary_score INTEGER DEFAULT 0 NOT NULL,
    menstrual_pain_score INTEGER DEFAULT 0 NOT NULL,
    
    -- Final diagnosis result
    diagnosis TEXT NOT NULL CHECK (diagnosis IN ('Primary dysmenorrhea', 'Secondary dysmenorrhea', 'Menstrual pain')),
    
    -- System fields
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one active record per user
    UNIQUE(user_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_diagnosis_results_user_id ON public.diagnosis_results(user_id);

-- Create index on diagnosis for analytics
CREATE INDEX idx_diagnosis_results_diagnosis ON public.diagnosis_results(diagnosis);

-- Enable Row Level Security
ALTER TABLE public.diagnosis_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own diagnosis results"
    ON public.diagnosis_results
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnosis results"
    ON public.diagnosis_results
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diagnosis results"
    ON public.diagnosis_results
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diagnosis results"
    ON public.diagnosis_results
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_diagnosis_results_updated_at
    BEFORE UPDATE ON public.diagnosis_results
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

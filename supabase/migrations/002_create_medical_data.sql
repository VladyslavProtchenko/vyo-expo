а -- Create Medical Data Table

CREATE TABLE public.medical_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

    -- Menstrual cycle
    start_menstruation DATE,
    menstruation_duration INTEGER DEFAULT 5,
    cycle_duration INTEGER DEFAULT 28,
    flow TEXT CHECK (flow IS NULL OR flow IN ('Light / Spotting', 'Medium', 'Moderately elevated', 'Heavy / Clots')),
    is_regular_period TEXT[] DEFAULT '{}',

    -- Diagnoses
    diagnosed_conditions TEXT[] DEFAULT '{}',

    -- Symptoms
    symptoms TEXT[] DEFAULT '{}',
    additional_symptoms TEXT[] DEFAULT '{}',
    other_symptoms TEXT[] DEFAULT '{}',

    -- Pain
    is_pain BOOLEAN,
    pain_type TEXT CHECK (pain_type IS NULL OR pain_type IN ('', 'Cramping', 'Aching', 'Sharp', 'Dull')),
    pain_intensity INTEGER CHECK (pain_intensity >= 0 AND pain_intensity <= 10),
    pain_period TEXT CHECK (pain_period IS NULL OR pain_period IN ('', 'Before period', 'During period', 'Ovulation', 'Not phase-dependent', 'Inconsistent')),
    pain_location TEXT[] DEFAULT '{}',
    pain_duration TEXT CHECK (pain_duration IS NULL OR pain_duration IN ('', 'Few hours', '1-2 days', '>2 days')),
    pain_case TEXT CHECK (pain_case IS NULL OR pain_case IN ('', 'Physical activity', 'Intercourse', 'Bowel movement', 'Urination', 'No connection with actions')),
    is_medicine TEXT CHECK (is_medicine IS NULL OR is_medicine IN ('', 'Well relieve', 'Weel relieve', 'Partially help', 'Don''t help', 'Don''t use them')),
    is_pain_change TEXT CHECK (is_pain_change IS NULL OR is_pain_change IN ('', 'No', 'A little', 'Nocitably', 'Strongly', 'The pain is new')),

    -- Surgery
    surgery TEXT,
    surgery_date DATE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id)
);

CREATE INDEX idx_medical_data_user_id ON public.medical_data(user_id);

ALTER TABLE public.medical_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own medical data"
    ON public.medical_data FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medical data"
    ON public.medical_data FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical data"
    ON public.medical_data FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medical data"
    ON public.medical_data FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_medical_data_updated_at
    BEFORE UPDATE ON public.medical_data
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create Diagnosis Table

CREATE TABLE IF NOT EXISTS public.diagnosis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

    diagnosis TEXT CHECK (diagnosis IN ('normal', 'dysmenorrhea', 'endometriosis', 'pcos')),
    pcos_type TEXT CHECK (pcos_type IN ('high', 'middle', 'possible')),
    endo_type INTEGER CHECK (endo_type BETWEEN 0 AND 8),
    is_endo_surgery BOOLEAN,
    is_endo_additional BOOLEAN,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_diagnosis_user_id ON public.diagnosis(user_id);

ALTER TABLE public.diagnosis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own diagnosis"
    ON public.diagnosis FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diagnosis"
    ON public.diagnosis FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diagnosis"
    ON public.diagnosis FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diagnosis"
    ON public.diagnosis FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_diagnosis_updated_at
    BEFORE UPDATE ON public.diagnosis
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

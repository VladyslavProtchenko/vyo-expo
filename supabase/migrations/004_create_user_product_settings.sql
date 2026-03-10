-- User product settings table
CREATE TABLE public.user_product_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    deleted_products TEXT[] DEFAULT '{}',
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE INDEX idx_user_product_settings_user_id ON public.user_product_settings(user_id);

ALTER TABLE public.user_product_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own product settings"
    ON public.user_product_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own product settings"
    ON public.user_product_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own product settings"
    ON public.user_product_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own product settings"
    ON public.user_product_settings FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_user_product_settings_updated_at
    BEFORE UPDATE ON public.user_product_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

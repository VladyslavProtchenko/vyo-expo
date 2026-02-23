-- Create User Product Settings Table
-- This table stores user preferences for products (excluded products, favorites, etc.)

CREATE TABLE public.user_product_settings (
    -- Primary key
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Product preferences
    deleted_products TEXT[] DEFAULT '{}',
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one record per user
    UNIQUE(user_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_product_settings_user_id ON public.user_product_settings(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_product_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own product settings"
    ON public.user_product_settings
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own product settings"
    ON public.user_product_settings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own product settings"
    ON public.user_product_settings
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own product settings"
    ON public.user_product_settings
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_product_settings_updated_at
    BEFORE UPDATE ON public.user_product_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

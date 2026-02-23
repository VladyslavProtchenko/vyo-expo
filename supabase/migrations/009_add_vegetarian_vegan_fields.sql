-- Add vegetarian and vegan fields to user_product_settings table

ALTER TABLE public.user_product_settings
ADD COLUMN IF NOT EXISTS is_vegetarian BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_vegan BOOLEAN DEFAULT false;

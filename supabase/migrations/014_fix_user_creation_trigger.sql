CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_name TEXT;
    user_avatar TEXT;
BEGIN
    user_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1),
        ''
    );
    
    IF user_name LIKE '% %' THEN
        user_name := split_part(user_name, ' ', 1);
    END IF;
    
    user_avatar := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture',
        NULL
    );
    
    INSERT INTO public.profiles (id, email, name, avatar_url)
    VALUES (NEW.id, NEW.email, user_name, user_avatar);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

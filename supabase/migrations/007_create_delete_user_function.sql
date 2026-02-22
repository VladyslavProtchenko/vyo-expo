-- Create function to delete user account from auth.users
-- This requires SECURITY DEFINER to have permission to delete from auth schema

CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id_to_delete UUID;
BEGIN
  -- Get current user ID
  user_id_to_delete := auth.uid();
  
  IF user_id_to_delete IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;

  -- Delete user from auth.users
  -- This will cascade delete profiles, medical_data, and diagnosis_results
  DELETE FROM auth.users WHERE id = user_id_to_delete;
  
  RETURN json_build_object('success', true);
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;

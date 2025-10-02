-- Add INSERT policy to allow user registration
CREATE POLICY "Allow public user registration"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Also add a policy to allow users to read referral codes for validation
CREATE POLICY "Allow reading referral codes for validation"
  ON public.users FOR SELECT
  USING (true);

-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;

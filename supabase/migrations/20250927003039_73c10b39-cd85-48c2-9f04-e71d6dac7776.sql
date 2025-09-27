-- Create profiles table for user data and referral system
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  referral_code TEXT UNIQUE NOT NULL DEFAULT 'REF' || upper(substring(gen_random_uuid()::text, 1, 8)),
  referred_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  total_referrals INTEGER DEFAULT 0,
  balance INTEGER DEFAULT 5000,
  device_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create referrals table to track referral relationships
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  reward_amount INTEGER DEFAULT 6500,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Enable RLS on referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Users can view their referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can insert referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

-- Create function to update referral count
CREATE OR REPLACE FUNCTION public.update_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_referrals count for the referrer
  UPDATE public.profiles 
  SET total_referrals = (
    SELECT COUNT(*) 
    FROM public.referrals 
    WHERE referrer_id = NEW.referrer_id AND status = 'completed'
  )
  WHERE user_id = NEW.referrer_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for referral count updates
CREATE TRIGGER update_referral_count_trigger
  AFTER INSERT OR UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_referral_count();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to process referral
CREATE OR REPLACE FUNCTION public.process_referral(referral_code_input TEXT, device_id_input TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
  referrer_user_id UUID;
  current_user_id UUID;
  result JSON;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'User not authenticated');
  END IF;
  
  -- Check if device_id is already used (prevent same device referrals)
  IF device_id_input IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE device_id = device_id_input) THEN
      RETURN json_build_object('success', false, 'message', 'Device already registered');
    END IF;
    
    -- Update user's device_id
    UPDATE public.profiles SET device_id = device_id_input WHERE user_id = current_user_id;
  END IF;
  
  -- Find referrer by referral code
  SELECT user_id INTO referrer_user_id 
  FROM public.profiles 
  WHERE referral_code = referral_code_input;
  
  IF referrer_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Invalid referral code');
  END IF;
  
  -- Prevent self-referral
  IF referrer_user_id = current_user_id THEN
    RETURN json_build_object('success', false, 'message', 'Cannot refer yourself');
  END IF;
  
  -- Check if already referred
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = current_user_id) THEN
    RETURN json_build_object('success', false, 'message', 'User already referred');
  END IF;
  
  -- Create referral record
  INSERT INTO public.referrals (referrer_id, referred_id, status)
  VALUES (referrer_user_id, current_user_id, 'completed');
  
  -- Update referred_by in profiles
  UPDATE public.profiles SET referred_by = referrer_user_id WHERE user_id = current_user_id;
  
  RETURN json_build_object('success', true, 'message', 'Referral processed successfully');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
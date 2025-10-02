-- Function to handle new referral
CREATE OR REPLACE FUNCTION public.handle_new_referral()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update referrer's stats
  UPDATE public.users
  SET 
    referral_count = referral_count + 1,
    referral_balance = referral_balance + NEW.amount
  WHERE id = NEW.referrer_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new referrals
DROP TRIGGER IF EXISTS on_referral_created ON public.referrals;

CREATE TRIGGER on_referral_created
  AFTER INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_referral();

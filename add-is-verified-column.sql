-- Add is_verified column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_verified boolean DEFAULT false;

-- Optionally, you can also add an index for faster queries
CREATE INDEX idx_profiles_is_verified ON public.profiles(is_verified);

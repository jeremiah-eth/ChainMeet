-- Run this in your Supabase SQL Editor to check if storage is properly configured

-- Check if the photos bucket exists
SELECT * FROM storage.buckets WHERE name = 'photos';

-- If the above returns nothing, create the bucket:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Check existing storage policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

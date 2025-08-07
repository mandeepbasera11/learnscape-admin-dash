-- Insert CCS Conduct Rules course with the uploaded cover photo
INSERT INTO public.courses (
  title,
  description,
  instructor_name,
  duration_weeks,
  price,
  level,
  thumbnail_url,
  is_published
) VALUES (
  'CCS Conduct Rules',
  'Comprehensive guide to Central Civil Services Conduct Rules and regulations for government employees.',
  'Admin',
  4,
  0,
  'Beginner',
  '/lovable-uploads/dffb5aa9-b7b9-4bd9-aead-3dbf4a932575.png',
  true
);
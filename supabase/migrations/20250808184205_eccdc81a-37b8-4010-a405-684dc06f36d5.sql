-- Add CCS Conduct rules 1964 course
INSERT INTO public.courses (
  title,
  description,
  instructor_name,
  price,
  duration_weeks,
  category_id,
  thumbnail_url,
  is_published
) VALUES (
  'CCS Conduct rules 1964',
  'Comprehensive guide to Central Civil Services (Conduct) Rules, 1964 - essential rules governing the conduct of government employees.',
  'Legal Expert',
  1999,
  4,
  (SELECT id FROM "Core Subjects" WHERE name = 'Legal Studies' LIMIT 1),
  '/src/assets/ccs-conduct-rules.jpg',
  true
);
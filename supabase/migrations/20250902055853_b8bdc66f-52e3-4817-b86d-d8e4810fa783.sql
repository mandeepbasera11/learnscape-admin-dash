-- Add remaining courses for Assistant Administrative Officers/Junior Administrative Officer/Assistant to NS

-- Add CCS(CCA) Rules course
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
  'CCS(CCA) Rules',
  'Central Civil Services (Classification, Control and Appeal) Rules - comprehensive guide to service classification, disciplinary procedures, and appeal mechanisms for government employees.',
  'Administrative Expert',
  1999,
  6,
  (SELECT id FROM "Core Subjects" WHERE name = 'Legal Studies' LIMIT 1),
  '/src/assets/ccs-conduct-rules.jpg',
  true
);

-- Add Manual on Office Procedure course
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
  'Manual on Office Procedure',
  'Comprehensive manual covering standard office procedures, file management, correspondence rules, and administrative protocols for government offices.',
  'Administrative Expert',
  1999,
  5,
  (SELECT id FROM "Core Subjects" WHERE name = 'Legal Studies' LIMIT 1),
  '/src/assets/general-financial-rules.jpg',
  true
);
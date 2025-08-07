-- Add new CCS-related courses
INSERT INTO public.courses (
  title,
  description,
  instructor_name,
  duration_weeks,
  price,
  level,
  thumbnail_url,
  is_published
) VALUES 
(
  'CCS Pension Rules',
  'Comprehensive guide to Central Civil Services Pension Rules and regulations for government employees retirement benefits.',
  'Admin',
  3,
  0,
  'Intermediate',
  '/placeholder.svg',
  true
),
(
  'RTI ACT',
  'Complete coverage of Right to Information Act - procedures, applications, and citizen rights for transparency in governance.',
  'Admin',
  2,
  0,
  'Beginner',
  '/placeholder.svg',
  true
),
(
  'General Financial Rules',
  'Essential financial regulations and procedures for government departments and public sector undertakings.',
  'Admin',
  4,
  0,
  'Intermediate',
  '/placeholder.svg',
  true
),
(
  'Travel Allowance',
  'Detailed guide to travel allowance rules, eligibility, and reimbursement procedures for government employees.',
  'Admin',
  2,
  0,
  'Beginner',
  '/placeholder.svg',
  true
),
(
  'CCS(LTC) Rules',
  'Central Civil Services Leave Travel Concession rules, benefits, and application procedures.',
  'Admin',
  2,
  0,
  'Beginner',
  '/placeholder.svg',
  true
),
(
  'CCS Leave Rules',
  'Comprehensive coverage of Central Civil Services Leave Rules - types of leave, eligibility, and procedures.',
  'Admin',
  3,
  0,
  'Intermediate',
  '/placeholder.svg',
  true
),
(
  'FR & SR',
  'Fundamental Rules and Subsidiary Rules governing service conditions and administration of government employees.',
  'Admin',
  4,
  0,
  'Advanced',
  '/placeholder.svg',
  true
);
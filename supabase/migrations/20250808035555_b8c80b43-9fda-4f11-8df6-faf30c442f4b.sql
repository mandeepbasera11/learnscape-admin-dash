-- Update thumbnails for CCS-related courses
UPDATE public.courses 
SET thumbnail_url = '/src/assets/ccs-pension-rules.jpg'
WHERE title = 'CCS Pension Rules';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/rti-act.jpg'
WHERE title = 'RTI ACT';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/general-financial-rules.jpg'
WHERE title = 'General Financial Rules';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/travel-allowance.jpg'
WHERE title = 'Travel Allowance';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/ccs-ltc-rules.jpg'
WHERE title = 'CCS(LTC) Rules';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/ccs-leave-rules.jpg'
WHERE title = 'CCS Leave Rules';

UPDATE public.courses 
SET thumbnail_url = '/src/assets/fr-sr-rules.jpg'
WHERE title = 'FR & SR';
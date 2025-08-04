-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  medical_college TEXT,
  year_of_study INTEGER,
  target_exam TEXT DEFAULT 'AIIMS',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for categories (public read)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  duration_weeks INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  thumbnail_url TEXT,
  total_students INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (is_published = true);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress DECIMAL(5,2) DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Enable RLS for enrollments
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own enrollments" 
ON public.course_enrollments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" 
ON public.course_enrollments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" 
ON public.course_enrollments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create test series table
CREATE TABLE public.test_series (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  total_tests INTEGER NOT NULL DEFAULT 1,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for test series
ALTER TABLE public.test_series ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published test series are viewable by everyone" 
ON public.test_series 
FOR SELECT 
USING (is_published = true);

-- Create individual tests table
CREATE TABLE public.tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_series_id UUID NOT NULL REFERENCES public.test_series(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sequence_number INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_questions INTEGER NOT NULL DEFAULT 50,
  passing_score DECIMAL(5,2) DEFAULT 60,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(test_series_id, sequence_number)
);

-- Enable RLS for tests
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published tests are viewable by everyone" 
ON public.tests 
FOR SELECT 
USING (is_published = true);

-- Create test attempts table
CREATE TABLE public.test_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  time_taken_minutes INTEGER,
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for test attempts
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own test attempts" 
ON public.test_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test attempts" 
ON public.test_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test attempts" 
ON public.test_attempts 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_test_series_updated_at
  BEFORE UPDATE ON public.test_series
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample categories
INSERT INTO public.categories (name, description, icon_name, color) VALUES
('Anatomy', 'Human anatomy and physiology', 'BookOpen', '#3B82F6'),
('Physiology', 'Body functions and systems', 'Heart', '#EF4444'),
('Biochemistry', 'Chemical processes in living organisms', 'Atom', '#10B981'),
('Pathology', 'Study of disease', 'Microscope', '#8B5CF6'),
('Pharmacology', 'Drug action and effects', 'Pill', '#F59E0B'),
('Surgery', 'Surgical procedures and techniques', 'Scissors', '#6B7280'),
('Medicine', 'Internal medicine and clinical practice', 'Stethoscope', '#EC4899'),
('Pediatrics', 'Medical care of children', 'Baby', '#14B8A6');

-- Insert sample courses
INSERT INTO public.courses (title, description, instructor_name, category_id, duration_weeks, price, level, thumbnail_url, total_students, rating, is_published) VALUES
('Human Anatomy Fundamentals', 'Complete guide to human anatomy for AIIMS preparation', 'Dr. Rajesh Kumar', (SELECT id FROM public.categories WHERE name = 'Anatomy'), 12, 2999.00, 'Beginner', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop', 1245, 4.8, true),
('Advanced Physiology', 'In-depth study of human physiology systems', 'Dr. Priya Sharma', (SELECT id FROM public.categories WHERE name = 'Physiology'), 10, 3499.00, 'Intermediate', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop', 892, 4.7, true),
('Medical Biochemistry', 'Essential biochemistry for medical students', 'Dr. Amit Patel', (SELECT id FROM public.categories WHERE name = 'Biochemistry'), 8, 2799.00, 'Beginner', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop', 1567, 4.9, true),
('General Pathology', 'Introduction to disease mechanisms', 'Dr. Sunita Mehta', (SELECT id FROM public.categories WHERE name = 'Pathology'), 14, 3999.00, 'Advanced', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop', 634, 4.6, true),
('Clinical Pharmacology', 'Drug therapy and clinical applications', 'Dr. Vikram Singh', (SELECT id FROM public.categories WHERE name = 'Pharmacology'), 6, 2499.00, 'Intermediate', 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop', 1123, 4.5, true),
('Surgical Techniques', 'Basic surgical procedures and instruments', 'Dr. Arjun Reddy', (SELECT id FROM public.categories WHERE name = 'Surgery'), 16, 4999.00, 'Advanced', 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop', 456, 4.8, true);

-- Insert sample test series
INSERT INTO public.test_series (title, subject, description, total_tests, difficulty, duration_minutes, is_published) VALUES
('AIIMS Anatomy Mock Tests', 'Anatomy', 'Comprehensive anatomy test series for AIIMS preparation', 15, 'Intermediate', 60, true),
('Physiology Assessment Series', 'Physiology', 'Complete physiology test series with detailed explanations', 12, 'Intermediate', 45, true),
('Biochemistry Quick Tests', 'Biochemistry', 'Short but comprehensive biochemistry tests', 10, 'Beginner', 30, true),
('Pathology Case Studies', 'Pathology', 'Clinical case-based pathology tests', 20, 'Advanced', 90, true),
('Pharmacology MCQs', 'Pharmacology', 'Multiple choice questions for pharmacology', 8, 'Intermediate', 45, true);

-- Insert sample individual tests
INSERT INTO public.tests (test_series_id, title, description, sequence_number, duration_minutes, total_questions, passing_score, is_published) VALUES
((SELECT id FROM public.test_series WHERE title = 'AIIMS Anatomy Mock Tests'), 'Basic Anatomy Test 1', 'Fundamental anatomy concepts', 1, 60, 50, 60, true),
((SELECT id FROM public.test_series WHERE title = 'AIIMS Anatomy Mock Tests'), 'Musculoskeletal System', 'Focus on bones, muscles, and joints', 2, 60, 50, 60, true),
((SELECT id FROM public.test_series WHERE title = 'AIIMS Anatomy Mock Tests'), 'Nervous System', 'Central and peripheral nervous system', 3, 60, 50, 60, true),
((SELECT id FROM public.test_series WHERE title = 'Physiology Assessment Series'), 'Cardiovascular Physiology', 'Heart and circulation', 1, 45, 40, 60, true),
((SELECT id FROM public.test_series WHERE title = 'Physiology Assessment Series'), 'Respiratory Physiology', 'Breathing and gas exchange', 2, 45, 40, 60, true),
((SELECT id FROM public.test_series WHERE title = 'Biochemistry Quick Tests'), 'Metabolism Basics', 'Fundamental metabolic pathways', 1, 30, 30, 60, true);
-- Create orders table to track payments
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  original_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'inr',
  discount_code TEXT,
  discount_amount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Edge functions can insert orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Edge functions can update orders" ON public.orders
  FOR UPDATE
  USING (true);

-- Create coupons table for discount codes
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value INTEGER NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active coupons for validation
CREATE POLICY "Active coupons are viewable by everyone" ON public.coupons
  FOR SELECT
  USING (is_active = true);

-- Only admins can modify coupons (for now, allowing edge functions)
CREATE POLICY "Edge functions can manage coupons" ON public.coupons
  FOR ALL
  USING (true);

-- Insert some sample coupon codes
INSERT INTO public.coupons (code, discount_type, discount_value, max_uses, valid_until) VALUES
('WELCOME10', 'percentage', 10, 100, now() + interval '30 days'),
('SAVE500', 'fixed', 500, 50, now() + interval '15 days'),
('STUDENT20', 'percentage', 20, 200, now() + interval '60 days');

-- Create trigger for updating updated_at columns
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at
  BEFORE UPDATE ON public.coupons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
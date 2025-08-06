import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");

    const { course_id, coupon_code } = await req.json();
    if (!course_id) throw new Error("Course ID is required");

    // Get course details
    const { data: course, error: courseError } = await supabaseClient
      .from('courses')
      .select('*')
      .eq('id', course_id)
      .single();

    if (courseError || !course) throw new Error("Course not found");

    let originalAmount = Math.round(course.price * 100); // Convert to paisa
    let discountAmount = 0;
    let finalAmount = originalAmount;
    let appliedCoupon = null;

    // Apply coupon if provided
    if (coupon_code) {
      const { data: coupon, error: couponError } = await supabaseClient
        .from('coupons')
        .select('*')
        .eq('code', coupon_code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (coupon && (!coupon.valid_until || new Date(coupon.valid_until) > new Date())) {
        if (!coupon.max_uses || coupon.current_uses < coupon.max_uses) {
          if (coupon.discount_type === 'percentage') {
            discountAmount = Math.round((originalAmount * coupon.discount_value) / 100);
          } else {
            discountAmount = Math.min(coupon.discount_value * 100, originalAmount); // Convert to paisa
          }
          finalAmount = originalAmount - discountAmount;
          appliedCoupon = coupon;

          // Update coupon usage
          await supabaseClient
            .from('coupons')
            .update({ current_uses: coupon.current_uses + 1 })
            .eq('id', coupon.id);
        }
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { 
              name: course.title,
              description: `Course by ${course.instructor_name}`,
            },
            unit_amount: finalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/courses`,
    });

    // Create order record
    const { error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        course_id: course_id,
        stripe_session_id: session.id,
        amount: finalAmount,
        original_amount: originalAmount,
        discount_code: appliedCoupon?.code || null,
        discount_amount: discountAmount,
        status: "pending",
      });

    if (orderError) throw orderError;

    return new Response(JSON.stringify({ 
      url: session.url,
      applied_coupon: appliedCoupon ? {
        code: appliedCoupon.code,
        discount_amount: discountAmount,
        final_amount: finalAmount
      } : null
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
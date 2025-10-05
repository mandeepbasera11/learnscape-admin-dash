import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
            discountAmount = Math.min(coupon.discount_value * 100, originalAmount);
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

    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order
    const orderData = {
      amount: finalAmount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        course_id: course_id,
        user_id: user.id,
        coupon_code: appliedCoupon?.code || null,
      }
    };

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.text();
      console.error("Razorpay error:", errorData);
      throw new Error("Failed to create Razorpay order");
    }

    const razorpayOrder = await razorpayResponse.json();

    // Create order record in database
    const { data: orderRecord, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        course_id: course_id,
        stripe_session_id: razorpayOrder.id, // Using this field for razorpay order id
        amount: finalAmount,
        original_amount: originalAmount,
        discount_code: appliedCoupon?.code || null,
        discount_amount: discountAmount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    return new Response(JSON.stringify({ 
      order_id: razorpayOrder.id,
      amount: finalAmount,
      currency: "INR",
      key: RAZORPAY_KEY_ID,
      user_email: user.email,
      user_name: user.user_metadata?.full_name || user.email,
      course_name: course.title,
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
    console.error("Razorpay payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

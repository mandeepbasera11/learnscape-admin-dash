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
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const { coupon_code, course_price } = await req.json();
    
    if (!coupon_code) {
      return new Response(JSON.stringify({ valid: false, message: "Coupon code is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { data: coupon, error } = await supabaseClient
      .from('coupons')
      .select('*')
      .eq('code', coupon_code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return new Response(JSON.stringify({ valid: false, message: "Invalid coupon code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if coupon is still valid
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return new Response(JSON.stringify({ valid: false, message: "Coupon has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if coupon usage limit reached
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      return new Response(JSON.stringify({ valid: false, message: "Coupon usage limit reached" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Calculate discount
    let discountAmount = 0;
    const originalAmount = course_price * 100; // Convert to paisa

    if (coupon.discount_type === 'percentage') {
      discountAmount = Math.round((originalAmount * coupon.discount_value) / 100);
    } else {
      discountAmount = Math.min(coupon.discount_value * 100, originalAmount);
    }

    const finalAmount = originalAmount - discountAmount;

    return new Response(JSON.stringify({ 
      valid: true,
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        discount_amount: discountAmount / 100, // Convert back to rupees
        final_amount: finalAmount / 100 // Convert back to rupees
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Coupon verification error:", error);
    return new Response(JSON.stringify({ valid: false, message: "Server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
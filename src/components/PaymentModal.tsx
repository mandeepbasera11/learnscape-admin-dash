import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    price: number;
    instructor_name: string;
  };
}

interface CouponData {
  code: string;
  discount_type: string;
  discount_value: number;
  discount_amount: number;
  final_amount: number;
}

export default function PaymentModal({ isOpen, onClose, course }: PaymentModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  const handleVerifyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsVerifyingCoupon(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-coupon', {
        body: { coupon_code: couponCode, course_price: course.price }
      });

      if (error) throw error;

      if (data.valid) {
        setAppliedCoupon(data.coupon);
        toast({
          title: "Coupon Applied!",
          description: `You saved ₹${data.coupon.discount_amount.toFixed(2)}`,
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: data.message || "This coupon is not valid",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to verify coupon",
        variant: "destructive"
      });
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          course_id: course.id,
          coupon_code: appliedCoupon?.code || null
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      onClose();
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const finalAmount = appliedCoupon ? appliedCoupon.final_amount : course.price;
  const savings = appliedCoupon ? appliedCoupon.discount_amount : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Details */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground">by {course.instructor_name}</p>
          </div>

          {/* Coupon Section */}
          <div className="space-y-3">
            <Label htmlFor="coupon">Discount Coupon (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={!!appliedCoupon}
              />
              {!appliedCoupon ? (
                <Button 
                  variant="outline" 
                  onClick={handleVerifyCoupon}
                  disabled={isVerifyingCoupon || !couponCode.trim()}
                >
                  {isVerifyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              ) : (
                <Button variant="outline" onClick={handleRemoveCoupon}>
                  Remove
                </Button>
              )}
            </div>
            
            {appliedCoupon && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Tag className="h-3 w-3 mr-1" />
                  {appliedCoupon.code}
                </Badge>
                <span className="text-sm text-green-600">
                  {appliedCoupon.discount_type === 'percentage' 
                    ? `${appliedCoupon.discount_value}% off` 
                    : `₹${appliedCoupon.discount_value} off`}
                </span>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Course Price:</span>
              <span>₹{course.price.toFixed(2)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount:</span>
                <span>-₹{savings.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span className="text-primary">₹{finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <Button 
            className="w-full" 
            onClick={handlePayment}
            disabled={isProcessingPayment}
            size="lg"
          >
            {isProcessingPayment ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹{finalAmount.toFixed(2)}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to Stripe to complete your payment securely
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
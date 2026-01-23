import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, GraduationCap, Sparkles, BookOpen, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = isLogin ? "Sign In | AIIMS Preparation" : "Sign Up | AIIMS Preparation";

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate, isLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back! 🎉",
          description: "Ready to continue your medical journey?",
        });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account created! 🌟",
          description: "Please check your email for verification link.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Oops! 😅",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: "Enter your email 📧",
        description: "Please enter your email above to receive a reset link.",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('request-password-reset', {
        body: { email }
      });
      
      if (error) throw error;
      
      toast({
        title: "Reset link sent! 📬",
        description: "Check your email for a password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, text: "1000+ Practice Questions", color: "bg-primary/10 text-primary" },
    { icon: Trophy, text: "Mock Tests & Live Exams", color: "bg-accent/20 text-accent-foreground" },
    { icon: Heart, text: "Expert Faculty Support", color: "bg-secondary/20 text-secondary" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="animate-float mb-8">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <GraduationCap className="h-10 w-10" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Your AIIMS Dream<br />
            <span className="text-accent">Starts Here!</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-md">
            Join thousands of successful medical aspirants who cracked AIIMS with our comprehensive preparation platform.
          </p>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6" />
                </div>
                <span className="text-lg font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md p-8 card-soft animate-bounce-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-2xl gradient-primary animate-pulse-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back! 👋" : "Join the Journey! 🚀"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isLogin ? "We missed you! Let's continue learning" : "Start your medical success story"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="animate-slide-up">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Full Name 📝
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl text-base border-2 focus:border-primary transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Email Address 📧
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl text-base border-2 focus:border-primary transition-all"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Password 🔐
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 rounded-xl text-base border-2 focus:border-primary transition-all pr-12"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-9 w-9 rounded-lg hover:bg-primary/10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm text-primary font-semibold"
                  onClick={handleResetPassword}
                >
                  Forgot password? 🤔
                </Button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold rounded-xl gradient-primary btn-playful shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Please wait...
                </span>
              ) : isLogin ? (
                "Let's Go! 🎯"
              ) : (
                "Create Account ✨"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-2">
              {isLogin ? "New to our platform?" : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold rounded-xl border-2 hover:bg-primary/5 hover:border-primary transition-all"
            >
              {isLogin ? "Create an Account 🌟" : "Sign In Instead 👋"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

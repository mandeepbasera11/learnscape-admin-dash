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
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-primary/5">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-secondary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          {/* Logo */}
          <div className="mb-10">
            <div className="w-20 h-20 rounded-3xl glass-card-subtle flex items-center justify-center animate-bounce-in">
              <GraduationCap className="h-10 w-10" />
            </div>
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6 leading-tight animate-fade-in">
            Your AIIMS Dream
            <br />
            <span className="text-accent drop-shadow-lg">Starts Here!</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-10 max-w-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join thousands of successful medical aspirants who cracked AIIMS with our comprehensive preparation platform.
          </p>
          
          {/* Feature cards */}
          <div className="space-y-4 stagger-animation">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 glass-card-subtle rounded-2xl px-6 py-4 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 hover:translate-x-2 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6" />
                </div>
                <span className="text-lg font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Subtle background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        
        <Card variant="elevated" className="w-full max-w-md p-8 animate-scale-in relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-5">
              <div className="p-4 rounded-2xl gradient-primary shadow-lg animate-pulse-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              {isLogin ? "Welcome Back! 👋" : "Join the Journey! 🚀"}
            </h1>
            <p className="text-muted-foreground text-base">
              {isLogin ? "We missed you! Let's continue learning" : "Start your medical success story"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="animate-slide-up">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Password
              </label>
              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-12"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 opacity-60 hover:opacity-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm font-semibold link-underline"
                  onClick={handleResetPassword}
                >
                  Forgot password?
                </Button>
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full font-bold"
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

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-medium">or</span>
            </div>
          </div>

          {/* Switch auth mode */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-3">
              {isLogin ? "New to our platform?" : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold w-full"
            >
              {isLogin ? "Create an Account 🌟" : "Sign In Instead 👋"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParallaxBackground, FloatingElement } from "@/components/ParallaxSection";
import { useMouseParallax } from "@/hooks/useParallax";
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Users, 
  Award,
  Play,
  ChevronRight,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const mousePosition = useMouseParallax(0.01);

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from top medical professionals and educators",
      emoji: "📚"
    },
    {
      icon: Target,
      title: "Mock Tests",
      description: "Practice with AIIMS-pattern questions and detailed analysis",
      emoji: "🎯"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics",
      emoji: "📊"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of medical aspirants on the same journey",
      emoji: "🤝"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Students", emoji: "👨‍🎓" },
    { value: "200+", label: "Video Courses", emoji: "🎬" },
    { value: "10K+", label: "Practice Questions", emoji: "📝" },
    { value: "95%", label: "Success Rate", emoji: "🏆" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <ParallaxBackground speed={0.08}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        </ParallaxBackground>
        
        {/* Floating decorative orbs */}
        <FloatingElement className="absolute top-20 left-[10%]" speed={0.6}>
          <div className="w-72 h-72 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 right-[10%]" speed={0.8} delay={0.1}>
          <div className="w-96 h-96 bg-gradient-to-br from-secondary/25 to-transparent rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement className="absolute top-1/3 right-[20%]" speed={1.0} delay={0.15}>
          <div className="w-48 h-48 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-2xl" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/4 left-[15%]" speed={0.4} delay={0.2}>
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
        </FloatingElement>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">India's #1 Medical Exam Prep Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Ace Your
              <span className="text-gradient block mt-2">Medical Exams</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of successful medical students. Expert courses, mock tests, and personalized learning paths to crack AIIMS, NEET & more.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="lg" className="text-lg px-8 py-6 font-bold" asChild>
                <Link to="/auth">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-semibold" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats row */}
          <div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card-subtle rounded-2xl p-6 text-center"
                style={{
                  transform: `translateY(${mousePosition.y * (0.02 + index * 0.01)}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <span className="text-3xl mb-2 block">{stat.emoji}</span>
                <p className="text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Features Section with Parallax Cards */}
      <section className="relative py-24 px-6">
        <ParallaxBackground speed={0.05}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        </ParallaxBackground>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Everything You Need to
              <span className="text-gradient"> Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed by medical professionals for medical aspirants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
            {features.map((feature, index) => (
              <Card 
                key={index}
                variant="interactive"
                className="p-6 text-center group"
              >
                <FloatingElement speed={0.3 + index * 0.1}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.emoji}</span>
                  </div>
                </FloatingElement>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <ParallaxBackground speed={0.1}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent" />
            </ParallaxBackground>
            
            <FloatingElement className="absolute -top-20 -right-20" speed={0.6}>
              <div className="w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement className="absolute -bottom-20 -left-20" speed={0.4}>
              <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </FloatingElement>
            
            <div className="relative p-12 md:p-16 text-center text-white">
              <GraduationCap className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                Join over 50,000 medical students who are already preparing smarter, not harder.
              </p>
              <Button variant="glass" size="lg" className="text-lg px-10 py-6 font-bold" asChild>
                <Link to="/auth">
                  Get Started Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;

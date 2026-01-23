import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Timer, 
  TrendingUp, 
  Award,
  Clock,
  Calendar,
  Play,
  FileText,
  Users,
  Sparkles,
  Target,
  Flame
} from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    testsCompleted: 0,
    averageScore: 0,
    certificates: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const { count: coursesCount } = await supabase
        .from('course_enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      const { count: testsCount } = await supabase
        .from('test_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)
        .eq('completed', true);

      const { data: attempts } = await supabase
        .from('test_attempts')
        .select('score')
        .eq('user_id', user?.id)
        .eq('completed', true);

      const avgScore = attempts && attempts.length > 0 
        ? attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length
        : 0;

      setStats({
        coursesEnrolled: coursesCount || 0,
        testsCompleted: testsCount || 0,
        averageScore: Math.round(avgScore),
        certificates: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsData = [
    {
      title: "Courses Enrolled",
      value: stats.coursesEnrolled.toString(),
      subtitle: "Keep learning! 📚",
      icon: BookOpen,
      gradient: "from-primary to-secondary",
      emoji: "📖"
    },
    {
      title: "Tests Completed",
      value: stats.testsCompleted.toString(),
      subtitle: "Practice makes perfect! 💪",
      icon: Timer,
      gradient: "from-success to-emerald-400",
      emoji: "✅"
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      subtitle: "Aim for the stars! ⭐",
      icon: TrendingUp,
      gradient: "from-accent to-yellow-400",
      emoji: "📊"
    },
    {
      title: "Certificates",
      value: stats.certificates.toString(),
      subtitle: "Complete courses! 🏆",
      icon: Award,
      gradient: "from-secondary to-pink-400",
      emoji: "🎖️"
    }
  ]

  const recentCourses = [
    {
      title: "Anatomy Fundamentals",
      progress: 75,
      instructor: "Dr. Sharma",
      lastAccessed: "2 hours ago",
      status: "In Progress",
      emoji: "🦴"
    },
    {
      title: "Biochemistry Basics",
      progress: 60,
      instructor: "Prof. Gupta",
      lastAccessed: "1 day ago",
      status: "In Progress",
      emoji: "🧬"
    },
    {
      title: "Physiology Complete",
      progress: 100,
      instructor: "Dr. Patel",
      lastAccessed: "3 days ago",
      status: "Completed",
      emoji: "❤️"
    }
  ]

  const upcomingTests = [
    {
      title: "Anatomy Quiz",
      course: "Anatomy Fundamentals",
      date: "Tomorrow, 2:00 PM",
      duration: "45 mins",
      type: "Quiz",
      emoji: "📝"
    },
    {
      title: "Biochemistry Test",
      course: "Biochemistry Basics",
      date: "Dec 15, 10:00 AM",
      duration: "2 hours",
      type: "Exam",
      emoji: "🧪"
    },
    {
      title: "AIIMS Mock Test",
      course: "Full Mock",
      date: "Dec 18, 3:00 PM",
      duration: "3 hours",
      type: "Mock Test",
      emoji: "🎯"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Champion'}!
            </h1>
            <span className="text-3xl animate-wiggle">🎉</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Ready to crush your medical exams today? Let's make it happen! 🚀
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="gradient-primary text-white font-bold btn-playful shadow-lg rounded-xl px-6" asChild>
            <Link to="/courses">
              <Play className="mr-2 h-5 w-5" />
              Continue Learning
            </Link>
          </Button>
          <Button variant="outline" className="font-semibold rounded-xl border-2 hover:bg-primary/5" asChild>
            <Link to="/mock-test">
              <Target className="mr-2 h-5 w-5" />
              Take a Test
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, index) => (
          <Card 
            key={index} 
            className="card-soft card-bouncy p-6 overflow-hidden relative group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.emoji}</span>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.subtitle}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Motivational Banner */}
      <Card className="gradient-primary p-6 rounded-2xl text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Flame className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">You're on a 5-day streak! 🔥</h3>
              <p className="text-white/80">Keep up the momentum - consistency is key to AIIMS success!</p>
            </div>
          </div>
          <Button variant="secondary" className="font-bold rounded-xl px-6 bg-white text-primary hover:bg-white/90">
            <Sparkles className="mr-2 h-4 w-4" />
            View Progress
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <Card className="card-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold text-foreground">Recent Courses</h2>
            </div>
            <Button variant="ghost" size="sm" className="font-semibold text-primary" asChild>
              <Link to="/my-courses">View All →</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div 
                key={index} 
                className="p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{course.emoji}</span>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {course.instructor}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={course.status === "Completed" ? "default" : "secondary"}
                    className={course.status === "Completed" ? "bg-success text-white" : ""}
                  >
                    {course.status === "Completed" ? "✅ Done" : "🔄 In Progress"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 mb-3" />
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  Last accessed {course.lastAccessed}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tests */}
        <Card className="card-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <h2 className="text-xl font-bold text-foreground">Upcoming Tests</h2>
            </div>
            <Button variant="ghost" size="sm" className="font-semibold text-primary" asChild>
              <Link to="/test-series">View Schedule →</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div 
                key={index} 
                className="p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{test.emoji}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">{test.course}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-lg font-semibold">{test.type}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {test.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3.5 w-3.5" />
                    {test.duration}
                  </div>
                </div>
                
                <Button size="sm" className="w-full rounded-xl font-semibold btn-playful">
                  <FileText className="mr-2 h-4 w-4" />
                  Start Preparation
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

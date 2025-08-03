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
  Users
} from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Courses Enrolled",
      value: "12",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Tests Completed",
      value: "45",
      change: "+8 this week",
      icon: Timer,
      color: "text-green-600"
    },
    {
      title: "Average Score",
      value: "87%",
      change: "+5% improvement",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Certificates",
      value: "3",
      change: "1 pending",
      icon: Award,
      color: "text-orange-600"
    }
  ]

  const recentCourses = [
    {
      title: "Advanced React Development",
      progress: 75,
      instructor: "Dr. Sarah Mitchell",
      lastAccessed: "2 hours ago",
      status: "In Progress"
    },
    {
      title: "Data Structures & Algorithms",
      progress: 60,
      instructor: "Prof. Michael Chen",
      lastAccessed: "1 day ago",
      status: "In Progress"
    },
    {
      title: "Web Security Fundamentals",
      progress: 100,
      instructor: "Dr. Emily Roberts",
      lastAccessed: "3 days ago",
      status: "Completed"
    }
  ]

  const upcomingTests = [
    {
      title: "React Components Quiz",
      course: "Advanced React Development",
      date: "Tomorrow, 2:00 PM",
      duration: "45 mins",
      type: "Quiz"
    },
    {
      title: "Algorithm Analysis Test",
      course: "Data Structures & Algorithms",
      date: "Dec 15, 10:00 AM",
      duration: "2 hours",
      type: "Exam"
    },
    {
      title: "Security Mock Test",
      course: "Web Security Fundamentals",
      date: "Dec 18, 3:00 PM",
      duration: "1.5 hours",
      type: "Mock Test"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Alka! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="gradient-primary text-white font-medium">
            <Play className="mr-2 h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-soft card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <Card className="card-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recent Courses</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {course.instructor}
                    </p>
                  </div>
                  <Badge variant={course.status === "Completed" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="mb-3" />
                
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
            <h2 className="text-xl font-semibold text-foreground">Upcoming Tests</h2>
            <Button variant="ghost" size="sm">View Schedule</Button>
          </div>
          
          <div className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{test.title}</h3>
                    <p className="text-sm text-muted-foreground">{test.course}</p>
                  </div>
                  <Badge variant="outline">{test.type}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {test.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    {test.duration}
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="mt-3 w-full">
                  <FileText className="mr-2 h-3 w-3" />
                  Prepare for Test
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
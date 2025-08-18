import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Clock, Users, Star } from "lucide-react"

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Dr. Basera",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center",
      status: "In Progress",
      nextLesson: "React Hooks Deep Dive"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Prof. Basera",
      progress: 60,
      totalLessons: 32,
      completedLessons: 19,
      rating: 4.6,
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop&crop=center",
      status: "In Progress",
      nextLesson: "Binary Trees Implementation"
    },
    {
      id: 3,
      title: "Web Security Fundamentals",
      instructor: "Dr. Basera",
      progress: 100,
      totalLessons: 16,
      completedLessons: 16,
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop&crop=center",
      status: "Completed",
      nextLesson: null
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="card-soft overflow-hidden group hover:shadow-card transition-all duration-300">
            <div className="relative h-48 bg-muted">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge variant={course.status === "Completed" ? "default" : "secondary"}>
                  {course.status}
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({course.completedLessons}/{course.totalLessons} lessons)
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              {course.nextLesson && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Next Lesson:</p>
                  <p className="text-sm font-medium">{course.nextLesson}</p>
                </div>
              )}
              
              <Button 
                className={`w-full ${course.status === "Completed" ? "variant-outline" : ""}`}
                variant={course.status === "Completed" ? "outline" : "default"}
              >
                {course.status === "Completed" ? (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Review Course
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
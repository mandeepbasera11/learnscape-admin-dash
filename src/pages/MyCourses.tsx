import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Clock, Users, Star } from "lucide-react"
import { getCourseImage } from "@/utils/courseImages"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

interface Enrollment {
  id: string;
  progress: number;
  completed: boolean;
  enrolled_at: string;
  courses: {
    id: string;
    title: string;
    instructor_name: string;
    duration_weeks: number;
    rating: number | null;
    thumbnail_url: string | null;
  };
}

export default function MyCourses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          id,
          progress,
          completed,
          enrolled_at,
          courses (
            id,
            title,
            instructor_name,
            duration_weeks,
            rating,
            thumbnail_url
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load enrolled courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="card-soft overflow-hidden">
              <div className="h-48 bg-muted animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : enrollments.length === 0 ? (
        <Card className="card-soft p-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
          <p className="text-muted-foreground mb-6">Start your learning journey by browsing available courses</p>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.courses;
            const courseImg = getCourseImage(course.title) || course.thumbnail_url;
            const status = enrollment.completed ? "Completed" : "In Progress";
            
            return (
              <Card key={enrollment.id} className="card-soft overflow-hidden group hover:shadow-card transition-all duration-300">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/20 overflow-hidden">
                  {courseImg ? (
                    <img 
                      src={courseImg} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant={enrollment.completed ? "default" : "secondary"}>
                      {status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{course.instructor_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{course.rating || '0'}</span>
                    <span className="text-sm text-muted-foreground">
                      • {course.duration_weeks} weeks
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant={enrollment.completed ? "outline" : "default"}
                  >
                    {enrollment.completed ? (
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
            );
          })}
        </div>
      )}
    </div>
  )
}
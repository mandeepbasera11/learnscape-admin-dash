import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Clock, Users, BookOpen, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import PaymentModal from "@/components/PaymentModal"

interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor_name: string;
  duration_weeks: number;
  price: number;
  thumbnail_url: string | null;
  total_students: number | null;
  rating: number | null;
  category_id: string | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true);

      if (error) throw error;
      
      setCourses(data || []);
      
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyCourse = (course: Course) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase courses",
        variant: "destructive"
      });
      return;
    }
    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          {
            user_id: user.id,
            course_id: courseId,
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already enrolled",
            description: "You are already enrolled in this course",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Successfully enrolled in the course",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive"
      });
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">All Courses</h1>
          <p className="text-muted-foreground">
            Discover new courses to expand your knowledge
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="card-soft overflow-hidden group hover:shadow-card transition-all duration-300">
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/20 overflow-hidden">
                {course.thumbnail_url ? (
                  <img 
                    src={course.thumbnail_url} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Course
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
                  <span className="text-lg font-bold text-primary">₹{course.price}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.instructor_name}</span>
                </div>
                
                 <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                   {course.description || 'No description available'}
                 </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration_weeks} weeks
                  </div>
                   <div className="flex items-center gap-1">
                     <Users className="h-3 w-3" />
                     {course.total_students?.toLocaleString() || '0'}
                   </div>
                   <div className="flex items-center gap-1">
                     <Star className="h-3 w-3 text-yellow-500 fill-current" />
                     {course.rating || '0'}
                   </div>
                </div>
                
                <div className="space-y-2">
                  {course.price === 0 ? (
                    <Button className="w-full" onClick={() => handleEnroll(course.id)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Enroll Free
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => handleBuyCourse(course)}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Buy Course - ₹{course.price}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedCourse(null);
          }}
          course={{
            id: selectedCourse.id,
            title: selectedCourse.title,
            price: selectedCourse.price,
            instructor_name: selectedCourse.instructor_name,
          }}
        />
      )}
    </div>
  )
}
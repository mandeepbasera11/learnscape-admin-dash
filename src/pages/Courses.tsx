import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Clock, Users, BookOpen, CreditCard, Sparkles, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import PaymentModal from "@/components/PaymentModal"
import { getCourseImage } from "@/utils/courseImages"

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
        title: "Oops! 😅",
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
        title: "Login Required 🔐",
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
        if (error.code === '23505') {
          toast({
            title: "Already enrolled! 📚",
            description: "You're already enrolled in this course",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Enrolled Successfully! 🎉",
          description: "Start learning now!",
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

  return (
    <div className="space-y-8 page-transition">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground">
              Explore Courses
            </h1>
            <span className="text-3xl">🎓</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover courses designed to help you crack AIIMS! 🚀
          </p>
        </div>
        <div className="flex items-center gap-3 glass-card px-5 py-3 rounded-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground">{courses.length} Courses Available</span>
        </div>
      </div>

      {/* Search and Filter */}
      <Card variant="glass" className="p-5 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search courses, instructors..." 
              className="pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="lg" className="font-semibold">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 shimmer" />
              <div className="p-6 space-y-3">
                <div className="h-5 shimmer rounded-lg" />
                <div className="h-4 shimmer rounded-lg w-3/4" />
                <div className="h-4 shimmer rounded-lg w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center animate-scale-in">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground">Try a different search term or browse all courses</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              variant="interactive"
              className="overflow-hidden group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                {(() => {
                  const courseImg = getCourseImage(course.title) || course.thumbnail_url;
                  return courseImg ? (
                    <img 
                      src={courseImg} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <GraduationCap className="h-16 w-16 text-primary/40" />
                    </div>
                  );
                })()}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`text-base font-bold px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm ${course.price === 0 ? 'bg-success/90 text-white' : 'bg-primary/90 text-white'}`}>
                    {course.price === 0 ? 'FREE 🎁' : `₹${course.price}`}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">
                      {course.instructor_name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{course.instructor_name}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description || 'Master this subject with comprehensive video lectures and practice tests.'}
                </p>
                
                <div className="flex items-center gap-4 mb-5 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{course.duration_weeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="font-medium">{course.total_students?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="font-bold">{course.rating || '4.5'}</span>
                  </div>
                </div>
                
                {course.price === 0 ? (
                  <Button 
                    variant="gradient"
                    size="lg"
                    className="w-full font-bold bg-gradient-to-r from-success to-emerald-400"
                    onClick={() => handleEnroll(course.id)}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Enroll Free 🎉
                  </Button>
                ) : (
                  <Button 
                    variant="gradient"
                    size="lg"
                    className="w-full font-bold"
                    onClick={() => handleBuyCourse(course)}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Buy Course
                  </Button>
                )}
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

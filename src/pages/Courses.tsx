import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Clock, Users, BookOpen } from "lucide-react"

export default function Courses() {
  const allCourses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      instructor: "Dr. Amanda Foster",
      duration: "8 weeks",
      students: 2341,
      rating: 4.7,
      price: "$99",
      level: "Beginner",
      category: "Data Science",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center",
      description: "Learn the fundamentals of machine learning with practical examples and hands-on projects."
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "John Martinez",
      duration: "6 weeks",
      students: 1892,
      rating: 4.9,
      price: "$79",
      level: "Advanced",
      category: "Programming",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center",
      description: "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming."
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Lisa Chen",
      duration: "4 weeks",
      students: 1564,
      rating: 4.8,
      price: "$69",
      level: "Intermediate",
      category: "Design",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop&crop=center",
      description: "Master the principles of user interface and user experience design."
    },
    {
      id: 4,
      title: "Database Management Systems",
      instructor: "Prof. Robert Kim",
      duration: "10 weeks",
      students: 987,
      rating: 4.5,
      price: "$129",
      level: "Intermediate",
      category: "Database",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=center",
      description: "Comprehensive course on database design, SQL, and database administration."
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      instructor: "Dr. Sarah Wilson",
      duration: "12 weeks",
      students: 1423,
      rating: 4.6,
      price: "$149",
      level: "Beginner",
      category: "Security",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center",
      description: "Learn essential cybersecurity concepts and practices to protect digital assets."
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Mike Thompson",
      duration: "8 weeks",
      students: 2156,
      rating: 4.7,
      price: "$119",
      level: "Intermediate",
      category: "Mobile",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
      description: "Build native mobile applications for iOS and Android platforms."
    }
  ]

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
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <Card key={course.id} className="card-soft overflow-hidden group hover:shadow-card transition-all duration-300">
            <div className="relative h-48 bg-muted">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary">{course.category}</Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
                <span className="text-lg font-bold text-primary">{course.price}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {course.students.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  {course.rating}
                </div>
              </div>
              
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Enroll Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
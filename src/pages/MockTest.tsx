import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer, Play, Clock, FileText, Target, TrendingUp } from "lucide-react"
#MOCK TEST SERIES
export default function MockTest() {
  const mockTests = [
    {
      id: 1,
      title: "React Development Assessment",
      subject: "Frontend Development",
      duration: "90 minutes",
      questions: 50,
      maxMarks: 100,
      attempts: 2,
      maxAttempts: 3,
      bestScore: 85,
      averageScore: 78,
      difficulty: "Intermediate",
      description: "Comprehensive test covering React components, hooks, state management, and performance optimization.",
      topics: ["Components", "Hooks", "State Management", "Performance"]
    },
    {
      id: 2,
      title: "Data Structures Final Mock",
      subject: "Computer Science",
      duration: "120 minutes",
      questions: 60,
      maxMarks: 120,
      attempts: 1,
      maxAttempts: 2,
      bestScore: 92,
      averageScore: 82,
      difficulty: "Advanced",
      description: "Advanced test on complex data structures including trees, graphs, and advanced algorithms.",
      topics: ["Trees", "Graphs", "Dynamic Programming", "Sorting"]
    },
    {
      id: 3,
      title: "Web Security Fundamentals",
      subject: "Cybersecurity",
      duration: "60 minutes",
      questions: 40,
      maxMarks: 80,
      attempts: 0,
      maxAttempts: 3,
      bestScore: null,
      averageScore: 65,
      difficulty: "Beginner",
      description: "Test your knowledge of web security principles, common vulnerabilities, and protection methods.",
      topics: ["OWASP Top 10", "Authentication", "Encryption", "Secure Coding"]
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Mock Tests</h1>
          <p className="text-muted-foreground">
            Practice with timed mock tests to assess your knowledge and improve performance
          </p>
        </div>
        <Button>
          <Timer className="mr-2 h-4 w-4" />
          View All Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTests.map((test) => (
          <Card key={test.id} className="card-soft p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{test.title}</h3>
                <p className="text-sm text-muted-foreground">{test.subject}</p>
              </div>
              <Badge className={getDifficultyColor(test.difficulty)}>
                {test.difficulty}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {test.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{test.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{test.questions} questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span>{test.maxMarks} marks</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span>{test.attempts}/{test.maxAttempts} attempts</span>
              </div>
            </div>

            {test.bestScore !== null && (
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Your Best Score</span>
                  <span className="text-lg font-bold text-primary">{test.bestScore}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  Average: {test.averageScore}%
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Topics Covered:</p>
              <div className="flex flex-wrap gap-1">
                {test.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              className="w-full" 
              disabled={test.attempts >= test.maxAttempts}
            >
              {test.attempts >= test.maxAttempts ? (
                "No attempts left"
              ) : test.attempts === 0 ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Mock Test
                </>
              ) : (
                <>
                  <Timer className="mr-2 h-4 w-4" />
                  Retake Test
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

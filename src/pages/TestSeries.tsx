import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Trophy, Users, Calendar } from "lucide-react"

export default function TestSeries() {
  const testSeries = [
    {
      id: 1,
      title: "React Development Mastery",
      subject: "Frontend Development",
      totalTests: 12,
      completedTests: 8,
      duration: "45 mins per test",
      difficulty: "Intermediate",
      participants: 1234,
      nextTest: "React Hooks Advanced",
      deadline: "Dec 20, 2024"
    },
    {
      id: 2,
      title: "Data Structures Complete Series",
      subject: "Computer Science",
      totalTests: 15,
      completedTests: 5,
      duration: "60 mins per test",
      difficulty: "Advanced",
      participants: 856,
      nextTest: "Binary Search Trees",
      deadline: "Jan 15, 2025"
    },
    {
      id: 3,
      title: "Web Security Assessment",
      subject: "Cybersecurity",
      totalTests: 8,
      completedTests: 8,
      duration: "30 mins per test",
      difficulty: "Beginner",
      participants: 642,
      nextTest: null,
      deadline: "Completed"
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Test Series</h1>
          <p className="text-muted-foreground">
            Practice with comprehensive test series to master your subjects
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Browse All Series
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {testSeries.map((series) => (
          <Card key={series.id} className="card-soft p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{series.title}</h3>
                <p className="text-sm text-muted-foreground">{series.subject}</p>
              </div>
              <Badge className={getDifficultyColor(series.difficulty)}>
                {series.difficulty}
              </Badge>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {series.completedTests}/{series.totalTests} tests
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(series.completedTests / series.totalTests) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {series.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {series.participants}
                </div>
              </div>
            </div>

            {series.nextTest ? (
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Next Test:</p>
                <p className="text-sm font-medium">{series.nextTest}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Due: {series.deadline}
                </div>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Series Completed!</span>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              variant={series.completedTests === series.totalTests ? "outline" : "default"}
            >
              {series.completedTests === series.totalTests ? (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  View Results
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Continue Series
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
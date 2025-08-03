import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Clock, Users, Calendar, Play, AlertCircle } from "lucide-react"

export default function LiveTest() {
  const liveTests = [
    {
      id: 1,
      title: "React Advanced Concepts Live Assessment",
      subject: "Frontend Development",
      instructor: "Dr. Sarah Mitchell",
      scheduledDate: "Dec 15, 2024",
      scheduledTime: "10:00 AM PST",
      duration: "2 hours",
      participants: 145,
      maxParticipants: 200,
      status: "upcoming",
      description: "Live proctored assessment covering advanced React concepts with real-time Q&A session.",
      requirements: ["Webcam", "Microphone", "Stable Internet"],
      isRegistered: true
    },
    {
      id: 2,
      title: "Database Design Live Challenge",
      subject: "Database Management",
      instructor: "Prof. Michael Chen",
      scheduledDate: "Dec 18, 2024",
      scheduledTime: "2:00 PM PST",
      duration: "3 hours",
      participants: 89,
      maxParticipants: 150,
      status: "upcoming",
      description: "Interactive database design challenge with live feedback from industry experts.",
      requirements: ["Database Software", "Webcam", "Microphone"],
      isRegistered: false
    },
    {
      id: 3,
      title: "Web Security Live Penetration Test",
      subject: "Cybersecurity",
      instructor: "Dr. Emily Roberts",
      scheduledDate: "Dec 12, 2024",
      scheduledTime: "3:00 PM PST",
      duration: "4 hours",
      participants: 200,
      maxParticipants: 200,
      status: "live",
      description: "Live penetration testing exercise on vulnerable web applications.",
      requirements: ["Kali Linux", "VPN Access", "Webcam"],
      isRegistered: true
    },
    {
      id: 4,
      title: "Algorithm Design Competition",
      subject: "Computer Science",
      instructor: "Prof. Robert Kim",
      scheduledDate: "Dec 8, 2024",
      scheduledTime: "11:00 AM PST",
      duration: "2.5 hours",
      participants: 167,
      maxParticipants: 180,
      status: "completed",
      description: "Competitive programming session with live leaderboard and instant feedback.",
      requirements: ["Code Editor", "Webcam", "Microphone"],
      isRegistered: true,
      score: 92,
      rank: 15
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "live":
        return "🔴 Live Now"
      case "upcoming":
        return "📅 Scheduled"
      case "completed":
        return "✅ Completed"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Live Tests</h1>
          <p className="text-muted-foreground">
            Join live proctored tests and interactive assessments with real-time monitoring
          </p>
        </div>
        <Button>
          <Video className="mr-2 h-4 w-4" />
          Schedule New Test
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {liveTests.map((test) => (
          <Card key={test.id} className="card-soft p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{test.title}</h3>
                <p className="text-sm text-muted-foreground">{test.subject}</p>
              </div>
              <Badge className={getStatusColor(test.status)}>
                {getStatusLabel(test.status)}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {test.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Instructor:</span>
                <span className="font-medium">{test.instructor}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{test.scheduledDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{test.scheduledTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{test.participants}/{test.maxParticipants}</span>
                </div>
              </div>
            </div>

            {test.status === "completed" && test.score && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Your Result</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{test.score}%</div>
                    <div className="text-xs text-green-600">Rank: #{test.rank}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Requirements:</p>
              <div className="flex flex-wrap gap-1">
                {test.requirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            {!test.isRegistered && test.status === "upcoming" && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-800">Registration required to join this test</span>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              variant={test.status === "live" ? "default" : test.status === "completed" ? "outline" : "secondary"}
              disabled={test.status === "upcoming" && !test.isRegistered}
            >
              {test.status === "live" ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Join Live Test
                </>
              ) : test.status === "upcoming" ? (
                test.isRegistered ? (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Test Scheduled
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Register Now
                  </>
                )
              ) : (
                <>
                  <Video className="mr-2 h-4 w-4" />
                  View Recording
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
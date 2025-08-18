import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit3 } from "lucide-react"

export default function Profile() {
  const userStats = [
    { label: "Courses Completed", value: "8", color: "text-green-600" },
    { label: "Tests Passed", value: "45", color: "text-blue-600" },
    { label: "Certificates Earned", value: "3", color: "text-purple-600" },
    { label: "Average Score", value: "87%", color: "text-orange-600" }
  ]

  const achievements = [
    { title: "React Expert", description: "Completed Advanced React Course", date: "Nov 2024" },
    { title: "Algorithm Master", description: "Scored 95% in Data Structures", date: "Oct 2024" },
    { title: "Security Champion", description: "Completed Cybersecurity Fundamentals", date: "Sep 2024" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and track your learning progress
          </p>
        </div>
        <Button>
          <Edit3 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Mandeep Basera" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">AJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Mandeep Basera</h3>
                <p className="text-muted-foreground">Computer Science Student</p>
                <Badge className="mt-2">Premium Member</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value="Mandeep" readOnly className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value="mk.basera@university.edu" readOnly className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="university">University</Label>
                  <Input id="university" value="MIT" readOnly className="mt-1" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value="Basera" readOnly className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value="+91  123-45678" readOnly className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" value="Computer Science" readOnly className="mt-1" />
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="card-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stats and Quick Info */}
        <div className="space-y-6">
          <Card className="card-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Learning Stats</h2>
            <div className="space-y-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Account Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Student ID:</span>
                <span className="font-medium">CS2024001</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium">Aug 2025</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Year:</span>
                <span className="font-medium">Junior</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">Vaishali Nagar, Jaipur</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
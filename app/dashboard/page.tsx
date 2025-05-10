import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, Calendar } from "lucide-react"
import Image from "next/image"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {session.user?.name || "Student"}</h1>
          <p className="text-gray-500">Here's an overview of your learning progress</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">Browse Courses</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-pink-600 mb-2" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-500">Active Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Clock className="h-8 w-8 text-pink-600 mb-2" />
            <p className="text-2xl font-bold">26h</p>
            <p className="text-sm text-gray-500">Learning Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Award className="h-8 w-8 text-pink-600 mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-500">Certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-pink-600 mb-2" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-500">Upcoming Sessions</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-8">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Web Development Bootcamp", progress: 65 },
          { title: "Data Science Fundamentals", progress: 42 },
          { title: "UI/UX Design Principles", progress: 78 },
        ].map((course, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative h-40">
              <Image  src="/images/authimage.jpg" alt={course.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <Button variant="outline" className="w-full mt-4">
                Resume Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8">Upcoming Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Web Development Live Session", date: "Today, 3:00 PM", duration: "1 hour" },
          { title: "Data Science Q&A", date: "Tomorrow, 5:00 PM", duration: "45 minutes" },
        ].map((session, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{session.title}</CardTitle>
              <CardDescription>
                {session.date} • {session.duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                Reschedule
              </Button>
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                Join Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

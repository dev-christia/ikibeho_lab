"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Award, Loader2 } from "lucide-react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  progress: number;
}

export default function CoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState("active");

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Mock data for demonstration
  useEffect(() => {
    if (status === "authenticated") {
      // In a real app, you would fetch this data from your API
      setTimeout(() => {
        setActiveCourses([
          {
            id: "1",
            title: "Web Development Bootcamp",
            description: "Learn modern web development from scratch",
            imageUrl: null,
            progress: 65,
          },
          {
            id: "2",
            title: "Data Science Fundamentals",
            description: "Master the basics of data science and analytics",
            imageUrl: null,
            progress: 42,
          },
          {
            id: "3",
            title: "UI/UX Design Principles",
            description: "Learn the core principles of effective UI/UX design",
            imageUrl: null,
            progress: 78,
          },
        ]);

        setCompletedCourses([
          {
            id: "4",
            title: "Introduction to Programming",
            description:
              "A beginner-friendly introduction to programming concepts",
            imageUrl: null,
            progress: 100,
          },
          {
            id: "5",
            title: "Digital Marketing Basics",
            description: "Learn the fundamentals of digital marketing",
            imageUrl: null,
            progress: 100,
          },
        ]);

        setIsLoading(false);
      }, 1000);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-500">Manage and track your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-pink-600 mb-2" />
            <p className="text-2xl font-bold">{activeCourses.length}</p>
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
            <p className="text-2xl font-bold">{completedCourses.length}</p>
            <p className="text-sm text-gray-500">Completed Courses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src="/placeholder.svg?height=160&width=320"
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Button variant="outline" className="w-full mt-4">
                    Resume Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src="/placeholder.svg?height=160&width=320"
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <Button variant="outline" className="w-full mt-4">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ToastContainer />
    </div>
  );
}

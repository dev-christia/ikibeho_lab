"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Review {
  id: string;
  courseId: string;
  courseName: string;
  courseImage?: string | null;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export default function ReviewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

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
        setReviews([
          {
            id: "1",
            courseId: "1",
            courseName: "Web Development Bootcamp",
            courseImage: null,
            rating: 5,
            comment:
              "This course was excellent! The instructor was very knowledgeable and the content was well-structured. I learned a lot and would highly recommend it to anyone interested in web development.",
            createdAt: "2025-04-15T10:30:00Z",
          },
          {
            id: "2",
            courseId: "2",
            courseName: "Data Science Fundamentals",
            courseImage: null,
            rating: 4,
            comment:
              "Great introduction to data science concepts. The practical exercises were very helpful, though I wish there were more advanced topics covered.",
            createdAt: "2025-04-10T14:45:00Z",
          },
          {
            id: "3",
            courseId: "4",
            courseName: "Introduction to Programming",
            courseImage: null,
            rating: 5,
            comment:
              "Perfect for beginners! The pace was just right and the examples were clear and easy to follow.",
            createdAt: "2025-03-22T09:15:00Z",
          },
        ]);

        setIsLoading(false);
      }, 1000);
    }
  }, [status]);

  const handleEditReview = (reviewId: string) => {
    // In a real app, you would implement edit functionality
    toast.info("Edit functionality would be implemented here");
  };

  const handleDeleteReview = (reviewId: string) => {
    // In a real app, you would implement delete functionality
    toast.info("Delete functionality would be implemented here");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ));
  };

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
        <h1 className="text-2xl font-bold mb-2">My Reviews</h1>
        <p className="text-gray-500">Manage your course reviews and ratings</p>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">
              You haven't written any reviews yet.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700">
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1">{review.courseName}</CardTitle>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">
                        {review.rating}/5 • {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditReview(review.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

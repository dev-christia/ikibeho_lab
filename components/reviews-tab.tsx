import { Star, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ReviewsTab() {
  const reviewStats = [
    { stars: 1, count: 100, color: "bg-red-500" },
    { stars: 2, count: 100, color: "bg-orange-500" },
    { stars: 3, count: 100, color: "bg-yellow-500" },
    { stars: 4, count: 100, color: "bg-green-500" },
    { stars: 5, count: 100, color: "bg-green-600" },
  ];

  const reviews = [
    {
      id: 1,
      rating: 4,
      courseName: "Beginners Guide to Design",
      author: "Chris Walter",
      time: "3 days ago",
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible pieces...",
    },
    {
      id: 2,
      rating: 4,
      courseName: "Data Warehouse - The Ultimate Guide",
      author: "Michel Evans",
      time: "3 days ago",
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible pieces...",
    },
    {
      id: 3,
      rating: 5,
      courseName: "Beginners Guide to Design",
      author: "Chris Walter",
      time: "4 days ago",
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible pieces...",
    },
    {
      id: 4,
      rating: 5,
      courseName: "Beginners Guide to Design",
      author: "Chris Walter",
      time: "5 days ago",
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible pieces...",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <div className="mb-4">
          <div className="text-sm text-slate-500">Total Reviews</div>
          <div className="text-2xl font-bold">1000</div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {reviewStats.map((stat) => (
            <div key={stat.stars} className="flex flex-col items-center">
              <div className="text-sm text-slate-500">
                {stat.stars} star reviews
              </div>
              <div className="text-lg font-semibold">{stat.count}</div>
              <div className={`w-8 h-1 mt-1 rounded-full ${stat.color}`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-slate-200">
            <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
              <div>
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  Course Name: {review.courseName}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{review.author}</span>
                  <span className="text-xs text-slate-500">{review.time}</span>
                </div>
              </div>
              <button className="p-1 rounded-md hover:bg-slate-100">
                <MoreHorizontal className="h-4 w-4 text-slate-500" />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-slate-600 line-clamp-2">
                {review.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

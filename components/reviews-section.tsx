import { Card, CardContent } from "@/components/ui/card";

export default function ReviewsSection() {
  const reviewStats = [
    { stars: 1, count: 100, color: "bg-red-500" },
    { stars: 2, count: 100, color: "bg-orange-500" },
    { stars: 3, count: 100, color: "bg-yellow-500" },
    { stars: 4, count: 100, color: "bg-green-500" },
    { stars: 5, count: 100, color: "bg-green-600" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-1">
              <div className="text-sm text-slate-500">Total Reviews</div>
              <div className="text-2xl font-bold">1000</div>
            </div>

            {reviewStats.map((stat) => (
              <div key={stat.stars} className="flex flex-col">
                <div className="text-sm text-slate-500">
                  {stat.stars} star reviews
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">{stat.count}</div>
                  <div className={`w-8 h-1 rounded-full ${stat.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

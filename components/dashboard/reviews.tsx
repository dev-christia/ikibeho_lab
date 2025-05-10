// components/dashboard/reviews.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Reviews() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:gap-4 gap-4 md:grid-cols-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">1000</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>1 star reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">100</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>2 star reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-orange-500">100</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>3 star reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-yellow-500">100</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>4 star reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-500">100</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>5 star reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">100</p>
        </CardContent>
      </Card>
    </div>
  );
}

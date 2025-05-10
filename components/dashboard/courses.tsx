// components/dashboard/courses.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Courses() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((course) => (
        <Card key={course}>
          <CardHeader>
            <CardTitle>Beginner's Guide to Design</CardTitle>
            <p className="text-sm text-gray-500">FREE</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$50.00</p>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold mt-2">13</p>
            <p className="text-sm text-gray-500">Chapters</p>
            <p className="text-lg font-semibold mt-2">234</p>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-lg font-semibold mt-2">25</p>
            <p className="text-sm text-gray-500">Certificates</p>
            <p className="text-lg font-semibold mt-2">25</p>
            <p className="text-sm text-gray-500">Reviews</p>
            <p className="text-lg font-semibold mt-2">500</p>
            <p className="text-sm text-gray-500">Shelf</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

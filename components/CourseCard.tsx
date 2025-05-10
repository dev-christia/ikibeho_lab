import Link from "next/link";

export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{course.title}</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="font-bold">${course.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Price</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{course.chapters}</p>
          <p className="text-sm text-gray-500">Chapters</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{course.orders}</p>
          <p className="text-sm text-gray-500">Orders</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="font-bold">{course.certificates}</p>
          <p className="text-sm text-gray-500">Certificates</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{course.reviews}</p>
          <p className="text-sm text-gray-500">Reviews</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{course.addedToShelf}</p>
          <p className="text-sm text-gray-500">Added to Shelf</p>
        </div>
      </div>

      <Link
        href={`/dashboard/courses/${course.id}`}
        className="block text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}

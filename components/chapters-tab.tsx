import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

export default function ChaptersTab({ courseId }: { courseId: string }) {
  const chapters = [
    {
      id: 1,
      chapter: 1,
      title: "The Solid State",
      type: "PDF",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "Free",
    },
    {
      id: 2,
      chapter: 2,
      title: "Solutions",
      type: "PDF",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 3,
      chapter: 3,
      title: "Electrochemistry",
      type: "PPT",
      date: "15 May 2020 9:00 am",
      status: "Draft",
      price: "$50.00",
    },
    {
      id: 4,
      chapter: 4,
      title: "Chemical Kinetics",
      type: "PPT+Video",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 5,
      chapter: 5,
      title: "Surface Chemistry",
      type: "PDF",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 6,
      chapter: 6,
      title: "General Principles and Processes of Isolation of Elements",
      type: "Video",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 7,
      chapter: 7,
      title: "The p-Block Elements",
      type: "PPT",
      date: "15 May 2020 9:00 am",
      status: "Draft",
      price: "$50.00",
    },
    {
      id: 8,
      chapter: 8,
      title: "The d & f Block Elements",
      type: "PDF",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 9,
      chapter: 9,
      title: "Coordination Compounds",
      type: "Video",
      date: "15 May 2020 9:00 am",
      status: "Publish",
      price: "$50.00",
    },
    {
      id: 10,
      chapter: 10,
      title: "Haloalkanes and Haloarenes",
      type: "PDF",
      date: "15 May 2020 9:00 am",
      status: "Draft",
      price: "$50.00",
    },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chapters</h2>
        <Link href={`/dashboard/courses/${courseId}/chapters/new`}>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Chapter
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Chapter</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow
              key={chapter.id}
              className="cursor-pointer hover:bg-slate-50"
            >
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.chapter}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.title}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.type}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.date}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  <Badge
                    variant={
                      chapter.status === "Publish" ? "default" : "secondary"
                    }
                  >
                    {chapter.status}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/courses/${courseId}/chapters/${chapter.id}`}
                  className="block w-full"
                >
                  {chapter.price}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { MoreHorizontal } from "lucide-react";

interface CourseHeaderProps {
  title: string;
}

export default function CourseHeader({ title }: CourseHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      <button className="p-1 rounded-md hover:bg-slate-100">
        <MoreHorizontal className="h-5 w-5 text-slate-500" />
      </button>
    </div>
  );
}

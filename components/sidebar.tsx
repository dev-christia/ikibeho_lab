"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="w-16 md:w-64 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <span className="font-semibold text-lg hidden md:block">Byway</span>
        </div>
        <button className="text-slate-400 hover:text-white">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-2 ${
                isActive("/dashboard")
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/courses"
              className={`flex items-center gap-3 px-4 py-2 ${
                isActive("/dashboard/courses")
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden md:inline">Courses</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/communication"
              className={`flex items-center gap-3 px-4 py-2 ${
                isActive("/dashboard/communication")
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="hidden md:inline">Communication</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/revenue"
              className={`flex items-center gap-3 px-4 py-2 ${
                isActive("/dashboard/revenue")
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span className="hidden md:inline">Revenue</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/setting"
              className={`flex items-center gap-3 px-4 py-2 ${
                isActive("/dashboard/setting")
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="hidden md:inline">Setting</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
          <span className="text-xs text-white">JD</span>
        </div>
        <div className="hidden md:block">
          <div className="text-sm">Hi, John</div>
        </div>
        <button className="ml-auto text-slate-400 hover:text-white">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

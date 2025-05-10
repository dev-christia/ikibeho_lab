"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  BookOpen,
  MessageSquare,
  Star,
  Settings,
  Home,
  LogOut,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface ProfileSidebarProps {
  activeItem?: string;
}

export default function ProfileSidebar({ activeItem }: ProfileSidebarProps) {
  const pathname = usePathname();

  // Determine active item from pathname if not explicitly provided
  const currentActiveItem =
    activeItem || pathname?.split("/").pop() || "dashboard";

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "profile",
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "courses",
      label: "My Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      name: "messages",
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "reviews",
      label: "My Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },
    {
      name: "settings",
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div
      id="profile-sidebar"
      className="fixed top-0 left-0 z-20 w-64 bg-white border-r border-gray-200 min-h-screen flex-shrink-0 -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-pink-600">Ikebeho Lab</h2>
          <p className="text-xs text-gray-500">Student Dashboard</p>
        </div>
        <button
          className="md:hidden text-gray-500 hover:text-pink-600"
          onClick={() => {
            const sidebar = document.getElementById("profile-sidebar");
            if (sidebar) {
              sidebar.classList.toggle("translate-x-0");
              sidebar.classList.toggle("-translate-x-full");
            }
          }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              currentActiveItem === item.name || pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => {
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 768) {
                      const sidebar =
                        document.getElementById("profile-sidebar");
                      if (sidebar) {
                        sidebar.classList.remove("translate-x-0");
                        sidebar.classList.add("-translate-x-full");
                      }
                    }
                  }}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-pink-600" : "text-gray-500"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 text-gray-500" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

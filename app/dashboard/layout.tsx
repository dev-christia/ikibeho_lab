"use client";

import type React from "react";
import { Menu } from "lucide-react";
import ProfileSidebar from "@/components/dashboard/profile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-pink-600"
          aria-label="Toggle sidebar"
          onClick={() => {
            const sidebar = document.getElementById("profile-sidebar");
            if (sidebar) {
              sidebar.classList.toggle("translate-x-0");
              sidebar.classList.toggle("-translate-x-full");
            }
          }}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <ProfileSidebar />
      <div className="flex-1 overflow-auto md:ml-64 pt-16 md:pt-0">
        {children}
      </div>
    </div>
  );
}

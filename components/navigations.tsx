// components/navigation.tsx
"use client"; // Mark as Client Component since we're using state

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Book,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-64`}
      >
        <div className="flex items-center gap-2 mb-8 mt-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <h1 className="text-xl font-bold">BYWAY</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/courses">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <Book className="mr-2 h-5 w-5" />
                  Courses
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/communication">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Communication
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/revenue">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Revenue
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <span>Hi, John</span>
          </div>
          <Button variant="ghost" className="text-white hover:bg-gray-800">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

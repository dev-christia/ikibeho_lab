"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/mainsite/site-header";
import { SiteFooter } from "@/components/mainsite/site-footer";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";

  const errorMessages: Record<string, { title: string; message: string }> = {
    CredentialsSignin: {
      title: "Invalid credentials",
      message:
        "The email or password you entered is incorrect. Please try again.",
    },
    EmailNotVerified: {
      title: "Email not verified",
      message: "Please verify your email address before logging in.",
    },
    Default: {
      title: "Authentication error",
      message:
        "An error occurred during the authentication process. Please try again.",
    },
  };

  const { title, message } = errorMessages[error] || errorMessages.Default;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#f9a8d4,#f9a8d4_10px,transparent_10px,transparent_20px)]"></div>
        </div>

        <div className="container mx-auto py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-gray-600 mb-6">{message}</p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/auth/login">Try Again</Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                >
                  <Link href="/auth/register">Create Account</Link>
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-pink-600 hover:underline"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

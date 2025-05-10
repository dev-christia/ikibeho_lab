"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/mainsite/site-header";
import { SiteFooter } from "@/components/mainsite/site-footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        setUserNotFound(false);

        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.status === 404) {
          setUserNotFound(true);
          toast.error("No account found with this email address");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to send reset link");
        }

        setSubmitted(true);
        toast.success("Password reset link has been sent to your email");
      } catch (error) {
        console.error("Forgot password error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#f9a8d4,#f9a8d4_10px,transparent_10px,transparent_20px)]"></div>
        </div>

        <div className="container mx-auto py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
            {!submitted ? (
              <>
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Reset your password
                </h1>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={error || userNotFound ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {userNotFound && (
                      <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>No account found with this email address</span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send reset link <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {userNotFound && (
                  <div className="mt-4 p-4 bg-pink-50 rounded-md">
                    <h3 className="text-sm font-medium text-pink-800 mb-2">
                      Don't have an account?
                    </h3>
                    <p className="text-xs text-pink-700 mb-3">
                      The email you entered is not registered in our system.
                      Would you like to create a new account?
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                      <Link href="/auth/register">Create Account</Link>
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to{" "}
                  <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-pink-600 hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <p>
                <Link
                  href="/auth/login"
                  className="text-pink-600 hover:underline font-medium"
                >
                  Back to sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ToastContainer />
    </div>
  );
}

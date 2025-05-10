"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/mainsite/site-header";
import { SiteFooter } from "@/components/mainsite/site-footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);

        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          toast.error(result.error, {
            position: "top-center",
          });
          return;
        }

        // Successful login
        toast.success("Login successful! Redirecting...", {
          position: "top-center",
        });

        // Redirect after a short delay
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 1000);
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Show error message from URL if present
  React.useEffect(() => {
    if (error) {
      let errorMessage = "An error occurred during sign in";

      switch (error) {
        case "CredentialsSignin":
          errorMessage = "Invalid email or password";
          break;
        case "EmailNotVerified":
          errorMessage = "Please verify your email before logging in";
          break;
        case "Default":
          errorMessage = "An error occurred during sign in";
          break;
      }

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full "></div>
        </div>

        <div className="container mx-auto py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm order-2 md:order-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Sign in to your account
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Username or Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-pink-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p>
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-pink-600 hover:underline font-medium"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            <div className="hidden md:block order-1 md:order-2">
              <Image
                src="/images/authimage.jpg"
                alt="Student reading"
                width={800}
                height={900}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ToastContainer />
    </div>
  );
}

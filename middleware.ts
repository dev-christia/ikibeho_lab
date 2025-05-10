import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/verify-email", "/auth/forgot-password"]
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Check if the path is for the dashboard
  const isDashboardPath = pathname.startsWith("/dashboard")

  // Redirect logic
  if (isDashboardPath && !token) {
    // Redirect to login if trying to access dashboard without being logged in
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isPublicPath && token) {
    // If user is logged in and trying to access login/register pages, redirect to dashboard
    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
}

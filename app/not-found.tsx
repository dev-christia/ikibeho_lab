import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/mainsite/site-header"
import { SiteFooter } from "@/components/mainsite/site-footer"
import { FileQuestion, Search, AlertCircle, Home, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full "></div>
        </div>

        <div className="container mx-auto py-12 md:py-24 px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="w-full max-w-md text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">404</h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Page Not Found</h2>
              <p className="text-lg text-gray-600 mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild className="bg-pink-600 hover:bg-pink-700">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full max-w-md flex items-center justify-center">
              <div className="relative">
                {/* Main icon */}
                <div className="bg-pink-100 rounded-full p-8 relative z-10">
                  <FileQuestion className="h-32 w-32 text-pink-600" />
                </div>

                {/* Decorative icons */}
                <div className="absolute -top-6 -right-6 bg-blue-100 rounded-full p-4 shadow-sm">
                  <Search className="h-10 w-10 text-blue-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-amber-100 rounded-full p-3 shadow-sm">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                </div>

                {/* Decorative circles */}
                <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 bg-green-100 rounded-full h-8 w-8"></div>
                <div className="absolute bottom-1/4 left-1/3 transform bg-purple-100 rounded-full h-6 w-6"></div>
                <div className="absolute top-1/4 left-1/4 transform bg-pink-200 rounded-full h-4 w-4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

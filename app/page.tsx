import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/mainsite/site-header";
import { SiteFooter } from "@/components/mainsite/site-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section with background pattern */}
        <div className="relative bg-white py-12 md:py-24">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#f9a8d4,#f9a8d4_10px,transparent_10px,transparent_20px)]"></div>
          </div>
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Unlock Your Potential with Ikebeho Lab
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                Join thousands of students mastering new skills and advancing
                their careers with our expert-led courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-5 md:px-8 md:py-6">
                  Get Started
                </Button>
                <Button variant="outline" className="px-6 py-5 md:px-8 md:py-6">
                  Explore Courses
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center mt-8 md:mt-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-pink-100 overflow-hidden">
                <Image
                  src="/images/authimage.jpg"
                  alt="Student learning"
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 overflow-hidden">
                <Image
                  src="/images/authimage.jpg"
                  alt="Student learning"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-100 overflow-hidden">
                <Image
                  src="/images/authimage.jpg"
                  alt="Student learning"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div className="space-y-2">
                <p className="text-2xl md:text-4xl font-bold text-pink-600">
                  250K+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Students</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl md:text-4xl font-bold text-pink-600">
                  1000+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Courses</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl md:text-4xl font-bold text-pink-600">
                  5k+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Reviews</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl md:text-4xl font-bold text-pink-600">
                  200K+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Graduates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Courses Section */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">
              Top Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 md:h-48">
                    <Image
                      src="/images/authimage.jpg"
                      alt={`Course ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center text-yellow-500 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3 md:w-4 md:h-4 fill-current"
                        />
                      ))}
                      <span className="text-gray-600 text-xs md:text-sm ml-2">
                        5.0
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      Web Development Bootcamp
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Learn modern web development from scratch
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <p className="font-bold text-pink-600 text-sm md:text-base">
                        $49.99
                      </p>
                      <Button
                        size="sm"
                        className="bg-pink-600 hover:bg-pink-700 text-xs md:text-sm"
                      >
                        Enroll
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Tutors Section */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">
              Learn from the Best
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src="/images/authimage.jpg"
                      alt={`Tutor ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Alex Johnson
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Web Development
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative bg-white py-12 md:py-24">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#f9a8d4,#f9a8d4_10px,transparent_10px,transparent_20px)]"></div>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-pink-100 overflow-hidden">
                  <Image
                    src="/images/authimage.jpg"
                    alt="Student testimonial"
                    width={256}
                    height={256}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 text-center md:text-left order-1 md:order-2">
                <div className="flex justify-center md:justify-start text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    />
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Student Success Stories
                </h2>
                <blockquote className="text-base md:text-lg text-gray-600">
                  "Ikebeho Lab completely transformed my learning experience.
                  The courses are well-structured, and the community support is
                  incredible. I landed my dream job just 3 months after
                  completing my first course!"
                </blockquote>
                <div>
                  <p className="font-semibold">Sarah M.</p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Web Developer
                  </p>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  Read More Stories
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Join thousands of students who are already advancing their careers
              with Ikebeho Lab.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700 px-6 py-5 md:px-8 md:py-6 text-base md:text-lg">
              Get Started Today
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

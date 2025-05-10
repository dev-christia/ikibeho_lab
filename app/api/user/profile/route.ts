import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { authOptions } from "@/lib/auth"



// GET user profile
export async function GET() {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        headline: true,
        bio: true,
        profileImage: true,
        language: true,
        website: true,
        twitter: true,
        linkedin: true,
        youtube: true,
        facebook: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// UPDATE user profile
export async function PATCH(request: Request) {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      headline,
      bio,
      profileImage,
      language,
      website,
      twitter,
      linkedin,
      youtube,
      facebook,
    } = body

    // Validate required fields
    if (!firstName || !lastName) {
      return NextResponse.json({ message: "First name and last name are required" }, { status: 400 })
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        headline,
        bio,
        profileImage,
        language,
        website,
        twitter,
        linkedin,
        youtube,
        facebook,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        headline: true,
        bio: true,
        profileImage: true,
        language: true,
        website: true,
        twitter: true,
        linkedin: true,
        youtube: true,
        facebook: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

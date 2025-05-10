import { NextResponse } from "next/server"
import { hash } from "bcrypt"

import { randomBytes } from "crypto"
import { sendVerificationEmail } from "@/lib/email"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, username, email, password } = body

    // Validate input
    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ message: "Email already in use" }, { status: 400 })
      }
      if (existingUser.username === username) {
        return NextResponse.json({ message: "Username already taken" }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex")
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code

    // Set token expiration (24 hours)
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        verificationToken,
        verificationCode,
        verificationTokenExpiry: tokenExpiry,
        isVerified: false,
      },
    })

    // Send verification email
    await sendVerificationEmail({
      to: email,
      firstName,
      verificationCode,
      verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken}`,
    })

    // Return success without exposing sensitive user data
    return NextResponse.json(
      {
        message: "User registered successfully. Please check your email to verify your account.",
        userId: user.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

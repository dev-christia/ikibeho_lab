import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { sendWelcomeEmail } from "@/lib/email"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, code, email } = body

    if (!token && (!code || !email)) {
      return NextResponse.json({ message: "Missing verification information" }, { status: 400 })
    }

    let user

    // Verify by token
    if (token) {
      user = await prisma.user.findFirst({
        where: {
          verificationToken: token,
          verificationTokenExpiry: {
            gt: new Date(),
          },
        },
      })
    }
    // Verify by code
    else {
      user = await prisma.user.findFirst({
        where: {
          email,
          verificationCode: code,
          verificationTokenExpiry: {
            gt: new Date(),
          },
        },
      })
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired verification token/code" }, { status: 400 })
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationCode: null,
        verificationTokenExpiry: null,
        emailVerifiedAt: new Date(),
      },
    })

    // Send welcome email
    await sendWelcomeEmail({
      to: user.email,
      firstName: user.firstName,
    })

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ message: "An error occurred during email verification" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

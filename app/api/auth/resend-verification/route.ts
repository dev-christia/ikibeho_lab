import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import { sendVerificationEmail } from "@/lib/email"
import prisma from "@/lib/prisma"


export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 400 })
    }

    // Generate new verification token and code
    const verificationToken = randomBytes(32).toString("hex")
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code

    // Set token expiration (24 hours)
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24)

    // Update user with new verification info
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationCode,
        verificationTokenExpiry: tokenExpiry,
      },
    })

    // Send verification email
    await sendVerificationEmail({
      to: email,
      firstName: user.firstName,
      verificationCode,
      verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${verificationToken}`,
    })

    return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ message: "An error occurred while resending verification email" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          message: "No account found with this email address",
          userExists: false,
        },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");

    // Set token expiration (1 hour)
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiry: resetTokenExpiry,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail({
      to: email,
      firstName: user.firstName,
      resetLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`,
    });

    return NextResponse.json(
      {
        message: "Password reset link has been sent to your email",
        userExists: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

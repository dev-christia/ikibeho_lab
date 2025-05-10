import nodemailer from "nodemailer"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

interface VerificationEmailProps {
  to: string
  firstName: string
  verificationCode: string
  verificationLink: string
}

export async function sendVerificationEmail({
  to,
  firstName,
  verificationCode,
  verificationLink,
}: VerificationEmailProps) {
  const mailOptions = {
    from: `"Ikebeho Lab" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #db2777; margin-bottom: 10px;">Ikebeho Lab</h1>
          <p style="font-size: 18px; font-weight: bold; color: #111827;">Verify Your Email Address</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p>Hello ${firstName},</p>
          <p>Thank you for registering with Ikebeho Lab! To complete your registration, please verify your email address.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
            <p style="font-size: 14px; margin-bottom: 10px;">Your verification code is:</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #db2777;">${verificationCode}</p>
          </div>
          
          <p>Alternatively, you can click the button below to verify your email:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email</a>
          </div>
          
          <p>If you didn't create an account with us, please ignore this email.</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Ikebeho Lab. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

interface WelcomeEmailProps {
  to: string
  firstName: string
}

export async function sendWelcomeEmail({ to, firstName }: WelcomeEmailProps) {
  const mailOptions = {
    from: `"Ikebeho Lab" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Welcome to Ikebeho Lab!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #db2777; margin-bottom: 10px;">Ikebeho Lab</h1>
          <p style="font-size: 18px; font-weight: bold; color: #111827;">Welcome to Ikebeho Lab!</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p>Hello ${firstName},</p>
          <p>Thank you for joining Ikebeho Lab! Your account has been successfully verified and is now ready to use.</p>
          
          <p>With your Ikebeho Lab account, you can:</p>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Access all our courses and learning materials</li>
            <li>Track your progress and achievements</li>
            <li>Connect with tutors and other students</li>
            <li>Receive personalized learning recommendations</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/login" style="background-color: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Log In to Your Account</a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>We're excited to have you on board!</p>
          <p>Best regards,<br>The Ikebeho Lab Team</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Ikebeho Lab. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

interface PasswordResetEmailProps {
  to: string
  firstName: string
  resetLink: string
}

export async function sendPasswordResetEmail({ to, firstName, resetLink }: PasswordResetEmailProps) {
  const mailOptions = {
    from: `"Ikebeho Lab" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #db2777; margin-bottom: 10px;">Ikebeho Lab</h1>
          <p style="font-size: 18px; font-weight: bold; color: #111827;">Reset Your Password</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p>Hello ${firstName},</p>
          <p>We received a request to reset your password for your Ikebeho Lab account. If you didn't make this request, you can safely ignore this email.</p>
          
          <p>To reset your password, click the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          
          <p>This link will expire in 1 hour for security reasons.</p>
          
          <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
          <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px;">${resetLink}</p>
          
          <p>If you didn't request a password reset, please contact our support team immediately.</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Ikebeho Lab. All rights reserved.</p>
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

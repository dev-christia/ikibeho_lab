"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/mainsite/site-header"
import { SiteFooter } from "@/components/mainsite/site-footer"
import { ToastContainer, toast } from "react-toastify"
import { Loader2, CheckCircle, RefreshCw } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""
  
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  
  // If token is provided in URL, verify automatically
  useEffect(() => {
    if (token) {
      verifyWithToken(token)
    }
  }, [token])
  
  const verifyWithToken = async (verificationToken: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed')
      }

      setIsVerified(true)
      toast.success('Email verified successfully!', {
        position: "top-center",
      })
      
      // Redirect to login after successful verification
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
      
    } catch (error) {
      console.error('Verification error:', error)
      toast.error(error instanceof Error ? error.message : 'Verification failed. Please try again.', {
        position: "top-center",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!verificationCode.trim()) {
      toast.error('Please enter the verification code', {
        position: "top-center",
      })
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          code: verificationCode 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed')
      }

      setIsVerified(true)
      toast.success('Email verified successfully!', {
        position: "top-center",
      })
      
      // Redirect to login after successful verification
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
      
    } catch (error) {
      console.error('Verification error:', error)
      toast.error(error instanceof Error ? error.message : 'Verification failed. Please try again.', {
        position: "top-center",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email address is missing', {
        position: "top-center",
      })
      return
    }
    
    try {
      setIsResending(true)
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification code')
      }

      toast.success('Verification code has been resent to your email', {
        position: "top-center",
      })
      
    } catch (error) {
      console.error('Resend error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to resend verification code', {
        position: "top-center",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#f9a8d4,#f9a8d4_10px,transparent_10px,transparent_20px)]"></div>
        </div>

        <div className="container mx-auto py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
            {isVerified ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">
                  Your email has been successfully verified. You will be redirected to the login page shortly.
                </p>
                <Button 
                  onClick={() => router.push('/auth/login')} 
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Go to Login
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h1>
                <p className="text-gray-600 mb-6 text-center">
                  We've sent a verification code to <span className="font-medium">{email}</span>. 
                  Please enter the code below to verify your email address.
                </p>

                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="verificationCode" className="text-sm font-medium">
                      Verification Code
                    </label>
                    <Input
                      id="verificationCode"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Didn't receive the code?
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-pink-600 border-pink-600"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
      <ToastContainer />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: 'http://localhost:3000/reset-password',
      })

      if (error) throw new Error(error.message)

      toast.success('If an account exists, a reset link has been sent.')
      setEmail('') // Kosongkan input setelah berhasil
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <Button type="submit" disabled={isLoading} className="mt-2 w-full">
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/signin" className="text-sm text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

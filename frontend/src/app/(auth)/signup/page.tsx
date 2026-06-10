'use client'

import { GoogleLogoIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner' // Import sonner

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:3000/',
      })
    } catch (err) {
      toast.error('Failed to sign up with Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: 'http://localhost:3000/email-verified',
      })

      if (signUpError) {
        throw new Error(signUpError.message || 'Failed to create account')
      }

      router.push('/verify-email')
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="flex w-full items-center justify-center space-x-2 py-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleLogoIcon weight="bold" className="size-4" aria-hidden={true} />
            <span>Sign up with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Sign up'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

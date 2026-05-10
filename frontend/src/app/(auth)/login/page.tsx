'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth-client'
import { GoogleLogoIcon } from '@phosphor-icons/react'
import { JSX, SVGProps, useState } from 'react'

const GoogleIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
)

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:3000/',
      })
    } catch (err) {
      console.error(err)
      setError('Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
          callbackURL: 'http://localhost:3000/',
        })

        if (error) {
          throw new Error(error.message || 'Invalid credentials')
        }
      } else {
        const { data, error } = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: '/',
        })

        if (error) {
          throw new Error(error.message || 'Failed to create account')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{isLogin ? 'Sign in' : 'Create an account'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your email below to sign in to your account'
              : 'Enter your details below to create your account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Google Button */}
          <Button
            variant="outline"
            className="flex w-full items-center justify-center space-x-2 py-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleLogoIcon weight="bold" className="size-4" aria-hidden={true} />
            {/* <GoogleIcon className="size-4" aria-hidden={true} /> */}
            <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="grid gap-4">
            {/* Name Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <a href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />
            </div>

            {/* Error Message Display */}
            {error && <div className="rounded-md bg-red-50 p-2 text-center text-sm text-red-500">{error}</div>}

            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
                setEmail('')
                setPassword('')
                setName('')
              }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

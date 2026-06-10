'use client'

import { EnvelopeSimpleIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>

          <CardDescription>We've sent a verification link to your email address.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <EnvelopeSimpleIcon className="size-20 text-primary" weight="duotone" />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Link href="/signin" className="w-full">
            <Button className="w-full">Continue to Sign In</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

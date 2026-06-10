'use client'

import { CheckCircleIcon } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function EmailVerifiedPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Email Verified</CardTitle>

          <CardDescription>Your email has been verified successfully.</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <CheckCircleIcon className="size-20 text-primary" weight="duotone" />
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">You can close this page and continue to sign in.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // Ambil session dengan meneruskan header dari request
  const session = await fetch('http://localhost:3001/api/v1/auth/get-session', {
    headers: await headers(),
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(() => null)

  // Jika tidak ada session, arahkan ke halaman login
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // redirect ke /task/all jika path adalah /
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/tasks/all', request.url))
  }

  // redirect ke / jika path adalah /tasks/all
  if (request.nextUrl.pathname === '/tasks/all') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}

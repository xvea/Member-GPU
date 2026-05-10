import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (!session) {
    return fail(res, 'Unauthorized', 401)
  }

  // @ts-ignore
  req.session = session

  next()
}

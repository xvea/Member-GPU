import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'

// authMiddleware(req: Request, res: Response, next: NextFunction)

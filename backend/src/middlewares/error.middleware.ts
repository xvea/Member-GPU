import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(`[Server Error] URL: ${req.method} ${req.url} | Message: ${err.message}`)

    const message = err.message || 'Internal Server Error'

    return fail(res, message, 500)
}
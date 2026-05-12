import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'

// menangkap semua error yang tidak terduga
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[Server Error] URL: ${req.method} ${req.url} | Message: ${err.message}`)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Terjadi Kesalahan Pada Server'
    return fail(res, message, statusCode)
}

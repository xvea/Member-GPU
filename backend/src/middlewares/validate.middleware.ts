import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'
import { ZodObject } from 'zod'

export function validate(schema: ZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return fail(res, result.error.issues[0].message, 400)
        }

        req.body = result.data

        next()
    }
}
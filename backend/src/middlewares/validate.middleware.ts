import { NextFunction, Request, Response } from 'express'
import { fail } from '../lib/api-response'
import { AnyZodObject, ZodError } from 'zod'

// Fungsi menerima schema Zod dan memastikan data request sesuai aturan sebelum diproses
export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors[0]?.message || 'Data yang dikirim tidak valid'

                return fail(res, errorMessage, 400)
            }
            return fail(res, 'Terjadi kesalahan pada sistem validasi', 500)
        }
    }
}



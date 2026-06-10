import { Response } from 'express'
import { ApiResponse } from '../types/api'

export function ok<T>(res: Response, data: T, message = 'Success', status = 200): Response {
  return res.status(status).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>)
}

export function fail(res: Response, error: string, status = 400): Response {
  return res.status(status).json({
    success: false,
    error,
  } as ApiResponse<null>)
}

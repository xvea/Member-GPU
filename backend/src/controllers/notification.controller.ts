import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as notificationService from '../services/notification.service'

export async function subscribeDevice(req: Request, res: Response) {
    const result = await notificationService.subscribeDevice(req.session.user.id, req.body)
    return ok(res, result, 'Device subscribed for notifications', 201)
}

export async function unsubscribeDevice(req: Request, res: Response) {
    await notificationService.unsubscribeDevice(req.session.user.id, req.body)
    return ok(res, null, 'Device unsubscribed from notifications')
}
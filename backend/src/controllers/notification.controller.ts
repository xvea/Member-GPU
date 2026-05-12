import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as notificationService from '../services/notification.service'

// mendaftarkan user
export async function subscribeDevice(req: Request, res: Response, next: NextFunction) {
   try {
    const userId = (req as any).session.user.id;
    const payload = req.body;
    const result = await notificationService.subscribeDevice(userId, payload);

    return ok(res, result, 'Berhasil mendaftarkan perangkat', 201);
   } catch (error) {
    next(error);   
   }
}

// mencabut user dari notifikasi
export async function unsubscribeDevice(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).session.user.id;
        const payload = req.body;
        
        await notificationService.unsubscribeDevice(userId, payload);
        return ok(res, null, 'Berhasil menghapus perangkat', 200);
    } catch (error) {
        next(error);
    }
}

// endpoint pengiriman notifikasi
export async function sendNotification(req: Request, res:Response, next: NextFunction) {
    try {
        const { userId, title, message, type, actionURL } = req.body;
        const isSent = await notificationService.sendPushNotification(userId, {
            title,
            message,
            type,
            actionUrl
        });

        if (!isSent) {
            return ok(res, null, 'User belum mendaftarkan perangkat untuk menerima push notification', 200);
        }

        return ok(res, null, 'Notifikasi berhasil dikirim', 200);
    } catch (error) {
        next(error);
    }
}
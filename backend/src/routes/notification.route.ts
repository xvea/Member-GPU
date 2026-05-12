import { Router } from 'express'
import * as controller from '../controllers/notification.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { createNotificationSchema, subscribeDeviceSchema } from '../schemas/notification.schema'

const router = Router()

// frontend mengizinkan notifikasi
router.post('/subscribe',
    authMiddleware,
    validate(subscribeDeviceSchema),
    controller.subscribeDevice
)

// frontend mencabut notifikasi
router.post('/unsubscribe',
    authMiddleware,
    validate(subscribeDeviceSchema),
    controller.unsubscribeDevice
)

// mengirim notifikasi
router.post('/send',
    authMiddleware,
    validate(createNotificationSchema),
    controller.sendNotification
)

export default router

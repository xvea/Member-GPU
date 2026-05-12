import { Router } from 'express'
import * as controller from '../controllers/notification.controller'
import { validate } from '../middlewares/validate.middleware'
import { subscribeDeviceSchema } from '../schemas/notification.schema'

const router = Router()

router.post('/subscribe', validate(subscribeDeviceSchema), controller.subscribeDevice)
router.post('/unsubscribe', validate(subscribeDeviceSchema), controller.unsubscribeDevice)

export default router
import { Router } from 'express'
import * as controller from '../controllers/cron.controller'
import { validate } from '../middlewares/validate.middleware'
import { triggerCronSchema } from '../schemas/cron.schema'

const router = Router()

router.post('/trigger', validate(triggerCronSchema), controller.triggerReminders)

export default router
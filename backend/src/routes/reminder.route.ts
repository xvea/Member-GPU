import { Router } from 'express'
import * as controller from '../controllers/reminder.controller'
import { validate } from '../middlewares/validate.middleware'
import { createReminderSchema } from '../schemas/reminder.schema'

const router = Router()

router.post('/', validate(createReminderSchema), controller.createReminder)

router.get('/', controller.getReminders)

router.patch('/:id/sent', controller.markReminderSent)

router.delete('/:id', controller.deleteReminder)

export default router
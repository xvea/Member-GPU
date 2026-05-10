import { Router } from 'express'
import * as controller from '../controllers/reminder.controller'
import { validate } from '../middlewares/validate.middleware'
import { createReminderSchema } from '../schemas/reminder.schema'

// / POST
// / GET
// /:id/sent PATCH
// /:id DELETE

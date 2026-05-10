import { Router } from 'express'
import * as controller from '../controllers/cron.controller'
import { validate } from '../middlewares/validate.middleware'
import { triggerCronSchema } from '../schemas/cron.schema'

// /trigger POST

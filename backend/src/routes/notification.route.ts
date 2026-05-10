import { Router } from 'express'
import * as controller from '../controllers/notification.controller'
import { validate } from '../middlewares/validate.middleware'
import { subscribeDeviceSchema } from '../schemas/notification.schema'

// /subscribe POST
// /unsubscribe POST

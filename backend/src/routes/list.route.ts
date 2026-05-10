import { Router } from 'express'
import * as controller from '../controllers/list.controller'
import { validate } from '../middlewares/validate.middleware'
import { createListSchema } from '../schemas/list.schema'

// / POST
// / GET

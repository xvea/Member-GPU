import { Router } from 'express'
import * as controller from '../controllers/tag.controller'
import { validate } from '../middlewares/validate.middleware'
import { createTagSchema } from '../schemas/tag.schema'

// / POST
// / GET
// /:id DELETE

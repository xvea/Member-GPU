import { Router } from 'express'
import * as controller from '../controllers/task-tag.controller'
import { validate } from '../middlewares/validate.middleware'
import { attachTagSchema } from '../schemas/task-tag.schema'

// / POST
// /:taskId/:tagId DELETE

import { Router } from 'express'
import * as controller from '../controllers/subtask.controller'
import { validate } from '../middlewares/validate.middleware'
import { createSubtaskSchema } from '../schemas/subtask.schema'

// / POST
// /task/:taskId GET
// /:id/toggle PATCH
// /:id DELETE

import { Router } from 'express'
import * as controller from '../controllers/task.controller'
import { validate } from '../middlewares/validate.middleware'
import { createTaskSchema, updateTaskStatusSchema } from '../schemas/task.schema'

// / POST
// / GET
// /:id/status PATCH
// /:id DELETE

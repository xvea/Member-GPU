import { Router } from 'express'
import * as controller from '../controllers/task.controller'
import { validate } from '../middlewares/validate.middleware'
import { createTaskSchema, updateTaskStatusSchema } from '../schemas/task.schema'

const router = Router()

router.post('/', validate(createTaskSchema), controller.createTask)

router.get('/', controller.getTasks)

router.patch('/:id/status', validate(updateTaskStatusSchema), controller.updateTaskStatus)

router.delete('/:id', controller.deleteTask)

export default router

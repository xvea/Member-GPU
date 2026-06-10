import { Router } from 'express'
import * as controller from '../controllers/subtask.controller'
import { validate } from '../middlewares/validate.middleware'
import { createSubtaskSchema } from '../schemas/subtask.schema'

const router = Router()

router.post('/', validate(createSubtaskSchema), controller.createSubtask)

router.get('/task/:taskId', controller.getSubtasks)

router.patch('/:id/toggle', controller.toggleSubtask)

router.delete('/:id', controller.deleteSubtask)

export default router

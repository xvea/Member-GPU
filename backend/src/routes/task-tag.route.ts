import { Router } from 'express'
import * as controller from '../controllers/task-tag.controller'
import { validate } from '../middlewares/validate.middleware'
import { attachTagSchema } from '../schemas/task-tag.schema'

const router = Router()

router.post('/', validate(attachTagSchema), controller.attachTag)

router.delete('/:taskId/:tagId', controller.detachTag)

export default router
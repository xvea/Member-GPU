import { Router } from 'express'
import * as controller from '../controllers/tag.controller'
import { validate } from '../middlewares/validate.middleware'
import { createTagSchema } from '../schemas/tag.schema'

const router = Router()

router.post('/', validate(createTagSchema), controller.createTag)

router.get('/', controller.getTags)

router.delete('/:id', controller.deleteTag)

export default router

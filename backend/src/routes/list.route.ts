import { Router } from 'express'
import * as controller from '../controllers/list.controller'
import { validate } from '../middlewares/validate.middleware'
import { createListSchema } from '../schemas/list.schema'

const router = Router()

router.post('/', validate(createListSchema), controller.createList)

router.get('/', controller.getLists)

export default router
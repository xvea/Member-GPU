import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as listService from '../services/list.service'

export async function createList(req: Request, res: Response) {
  const list = await listService.createList({
    ...req.body,
    userId: req.session.user.id,
  })

  return ok(res, list, 'List created', 201)
}

export async function getLists(req: Request, res: Response) {
  const lists = await listService.getLists(req.session.user.id)

  return ok(res, lists)
}

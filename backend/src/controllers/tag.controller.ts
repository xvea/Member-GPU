import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as tagService from '../services/tag.service'

export async function createTag(req: Request, res: Response) {
  const tag = await tagService.createTag({
    ...req.body,
    userId: req.session.user.id,
  })

  return ok(res, tag, 'Tag created', 201)
}

export async function getTags(req: Request, res: Response) {
  const tags = await tagService.getTags(req.session.user.id)

  return ok(res, tags)
}

export async function deleteTag(req: Request, res: Response) {
  await tagService.deleteTag(req.params.id as string)

  return ok(res, null, 'Tag deleted')
}

import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as taskTagService from '../services/task-tag.service'

export async function attachTag(req: Request, res: Response) {
  const result = await taskTagService.attachTag(req.body)

  return ok(res, result, 'Tag attached')
}

export async function detachTag(req: Request, res: Response) {
  await taskTagService.detachTag(req.params.taskId as string, req.params.tagId as string)

  return ok(res, null, 'Tag detached')
}

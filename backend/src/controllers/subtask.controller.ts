import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as subtaskService from '../services/subtask.service'

export async function createSubtask(req: Request, res: Response) {
  const subtask = await subtaskService.createSubtask(req.body)

  return ok(res, subtask, 'Subtask created', 201)
}

export async function getSubtasks(req: Request, res: Response) {
  const subtasks = await subtaskService.getSubtasks(req.params.taskId as string)

  return ok(res, subtasks)
}

export async function toggleSubtask(req: Request, res: Response) {
  const subtask = await subtaskService.toggleSubtask(req.params.id as string)

  return ok(res, subtask, 'Subtask updated')
}

export async function deleteSubtask(req: Request, res: Response) {
  await subtaskService.deleteSubtask(req.params.id as string)

  return ok(res, null, 'Subtask deleted')
}

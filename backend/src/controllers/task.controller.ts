import { Request, Response } from 'express'
import { fail, ok } from '../lib/api-response'
import * as taskService from '../services/task.service'
import { canTransition } from '../utils/task-transition'

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask({
    ...req.body,
    userId: req.session.user.id,
  })

  return ok(res, task, 'Task created', 201)
}

export async function getTasks(req: Request, res: Response) {
  const tasks = await taskService.getTasks(req.session.user.id)

  return ok(res, tasks)
}

export async function updateTaskStatus(req: Request, res: Response) {
  const { id } = req.params
  const { status } = req.body

  const task = await taskService.getTaskById(id as string)

  if (!task) {
    return fail(res, 'Task not found', 404)
  }

  const allowed = canTransition(task.status, status)

  if (!allowed) {
    return fail(res, 'Invalid status transition', 400)
  }

  await taskService.updateTaskStatus(id as string, status)

  return ok(res, null, 'Task updated')
}

export async function deleteTask(req: Request, res: Response) {
  await taskService.deleteTask(req.params.id as string)

  return ok(res, null, 'Task deleted')
}

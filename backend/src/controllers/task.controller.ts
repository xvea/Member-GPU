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

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params
  const { status, priority, description, listId } = req.body

  const task = await taskService.getTaskById(id as string)

  if (!task) {
    return fail(res, 'Task not found', 404)
  }

  const updateData: Record<string, any> = {}

  // Validasi transisi status hanya jika status disertakan di request body
  if (status && status !== task.status) {
    const allowed = canTransition(task.status, status)
    if (!allowed) {
      return fail(res, 'Invalid status transition', 400)
    }
    updateData.status = status
  }

  // Set priority jika dikirim
  if (priority) {
    updateData.priority = priority
  }

  // Konversi empty string "" menjadi null
  if (description !== undefined) {
    updateData.description = description === '' ? null : description
  }

  if (listId !== undefined) {
    updateData.listId = listId === '' ? null : listId
  }

  // Eksekusi update jika ada data yang diubah
  if (Object.keys(updateData).length > 0) {
    await taskService.updateTask(id as string, updateData)
  }

  return ok(res, null, 'Task updated')
}

export async function deleteTask(req: Request, res: Response) {
  await taskService.deleteTask(req.params.id as string)

  return ok(res, null, 'Task deleted')
}

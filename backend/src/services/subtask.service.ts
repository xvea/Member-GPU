import { db } from '../db'
import { subtasks } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createSubtask(data: any) {
  await db.insert(subtasks).values(data)
  return data
}

export async function getSubtasks(taskId: string) {
  return db.select().from(subtasks).where(eq(subtasks.taskId, taskId))
}

export async function toggleSubtask(id: string) {
  const [subtask] = await db.select().from(subtasks).where(eq(subtasks.id, id))
  if (!subtask) throw new Error('Subtask not found')

  const updated = await db.update(subtasks).set({ isDone: !subtask.isDone }).where(eq(subtasks.id, id)).returning()
  return updated[0]
}

export async function deleteSubtask(id: string) {
  await db.delete(subtasks).where(eq(subtasks.id, id))
}

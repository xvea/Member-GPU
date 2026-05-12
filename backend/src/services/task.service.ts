import { db } from '../db'
import { tasks } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createTask(data: any) {
  await db.insert(tasks).values(data)

  return data
}

export async function getTasks(userId: string) {
  return db.query.tasks.findMany({
    where: eq(tasks.userId, userId),
    with: {
      subtasks: true,
      reminders: true,
      taskTags: true,
    },
  })
}

export async function getTaskById(id: string) {
  return db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  })
}

export async function updateTaskStatus(id: string, status: string) {
  await db.update(tasks).set({ status }).where(eq(tasks.id, id))
}

export async function deleteTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id))
}

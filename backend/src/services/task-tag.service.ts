import { db } from '../db'
import { taskTags } from '../db/schema'
import { and, eq } from 'drizzle-orm'

export async function attachTag(data: any) {
  await db.insert(taskTags).values(data)
  return data
}

export async function detachTag(taskId: string, tagId: string) {
  await db.delete(taskTags).where(and(eq(taskTags.taskId, taskId), eq(taskTags.tagId, tagId)))
}

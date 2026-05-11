import { db } from '../db'
import { tags } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createTag(data: any) {
  await db.insert(tags).values(data)

  return data
}

export async function getTags(userId: string) {
  return db.query.tags.findMany({
    where: eq(tags.userId, userId),
  })
}

export async function deleteTag(id: string) {
  await db.delete(tags).where(eq(tags.id, id))
}

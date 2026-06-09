import { db } from '../db'
import { lists } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createList(data: any) {
  const [createdList] = await db.insert(lists).values(data).returning()

  return createdList
}

export async function getLists(userId: string) {
  return db.query.lists.findMany({
    where: eq(lists.userId, userId),
  })
}

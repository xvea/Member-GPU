import { db } from '../db'
import { reminders } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function createReminder(data: any) {
  await db.insert(reminders).values(data)
  return data
}

export async function getReminders(userId: string) {
  return db.select().from(reminders).where(eq(reminders.userId, userId))
}

export async function markReminderSent(id: string) {
  await db.update(reminders).set({ isSent: true }).where(eq(reminders.id, id))
}

export async function deleteReminder(id: string) {
  await db.delete(reminders).where(eq(reminders.id, id))
}

import { db } from '../db'
import { pushSubscriptions, reminders, tasks } from '../db/schema'
import { env } from '../lib/env'
import { and, eq, lte } from 'drizzle-orm'
import webpush from 'web-push'
webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY)

const nextReminderTable: Record<string, (currentDate: Date, interval: number) => Date> = {
  daily: (date, interval) => new Date(date.getTime() + interval * 24 * 60 * 60 * 1000),
  weekly: (date, interval) => new Date(date.getTime() + interval * 7 * 24 * 60 * 60 * 1000),
  monthly: (date, interval) => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + interval)
    return newDate
  },
  yearly: (date, interval) => {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + interval)
    return newDate
  },
}

export async function processDueReminders() {
  const now = new Date().toISOString()

  const dueReminders = await db
    .select({
      reminder: reminders,
      task: tasks,
    })
    .from(reminders)
    .innerJoin(tasks, eq(reminders.taskId, tasks.id))
    .where(and(eq(reminders.isSent, false), lte(reminders.remindAt, now)))

  let sentCount = 0

  for (const item of dueReminders) {
    const userSubs = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, item.reminder.userId))

    for (const sub of userSubs) {
      try {
        const pushConfig = JSON.parse(sub.subscription)
        await webpush.sendNotification(
          pushConfig,
          JSON.stringify({
            title: 'Pengingat Tugas!',
            body: item.task.title,
            url: `/tasks/${item.task.id}`,
          })
        )
      } catch (error) {
        console.error('Gagal mengirim ke satu device, mungkin sudah unsubscribe')
      }
    }

    const { repeatType, repeatInterval, remindAt, id } = item.reminder

    if (repeatType && nextReminderTable[repeatType]) {
      const currentDate = new Date(remindAt)

      const calculateNextDate = nextReminderTable[repeatType]
      const nextDate = calculateNextDate(currentDate, repeatInterval || 1)

      await db
        .update(reminders)
        .set({
          remindAt: nextDate.toISOString(),
          isSent: false,
        })
        .where(eq(reminders.id, id))
    } else {
      await db.update(reminders).set({ isSent: true }).where(eq(reminders.id, id))
    }

    sentCount++
  }

  return { processed: sentCount }
}

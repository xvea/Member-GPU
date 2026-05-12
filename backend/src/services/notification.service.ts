import { db } from '../db'
import { pushSubscriptions } from '../db/schema'
import { and, eq } from 'drizzle-orm'

export async function subscribeDevice(userId: string, subscriptionPayload: any) {
  const subscriptionString = JSON.stringify(subscriptionPayload)

  const existing = await db.query.pushSubscriptions.findFirst({
    where: and(eq(pushSubscriptions.userId, userId), eq(pushSubscriptions.subscription, subscriptionString)),
  })

  if (!existing) {
    await db.insert(pushSubscriptions).values({
      userId,
      subscription: subscriptionString,
    })
  }

  return subscriptionPayload
}

export async function unsubscribeDevice(userId: string, subscriptionPayload: any) {
  const subscriptionString = JSON.stringify(subscriptionPayload)

  await db
    .delete(pushSubscriptions)
    .where(and(eq(pushSubscriptions.userId, userId), eq(pushSubscriptions.subscription, subscriptionString)))

  return true
}
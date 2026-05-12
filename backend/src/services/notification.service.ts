import { db } from '../db'
import { pushSubscriptions } from '../db/schema'
import { and, eq } from 'drizzle-orm'
import webpush from 'web-push'
import { env } from '../lib/env'

// Mengamankan private key dari .env
webpush.setVapidDetails(
  env.VAPID_SUBJECT,
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
)

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

// mengirim notifikasi
export async function sendPushNotification(userId: string, payload: { title: string; message: string; type?: string; actionUrl?: string }) {
  const userSubscriptons = await db.query.pushSubscriptions.findMany({
    where: eq(pushSubscriptions.userId, userId),
  })

  if (userSubscriptons.length === 0) {
    console.log(`[Notification] User ${userId} tidak memiliki perangkat yang terdaftar.`);
    return false;
  }

  // format payload web push
  const pushPayload = JSON.stringify({
    title: payload.title,
    body: payload.message,
    data: {
      url: payload.actionUrl || '/',
      type: payload.type || 'system'
    }
  })

  //kirim ke tiap device dengan try catch
  const sendPromises = userSubscriptons.map(async (sub) => {
    try {
      const subscription = JSON.parse(sub.subscription);
      await webpush.sendNotification(subscriptionObject, pushPayLoad);
      } catch (error: any) {
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log(`[Notification] menghapus subscription user ${userId} karena kedaluwarsa`);
          await db.delete(pushSubscriptions).where(eq(pushSubscriptions.id, sub.id));
        } else {
          console.error(`[Notification] Gagal mengirim ke user ${userId}:`, error.message);
        }
      }
    });

    await Promise.all(sendPromises);
    return true;
  }
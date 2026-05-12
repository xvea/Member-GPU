import { Request, Response } from 'express'
import { ok } from '../lib/api-response'
import * as reminderService from '../services/reminder.service'

export async function createReminder(req: Request, res: Response) {
  const reminder = await reminderService.createReminder({
    ...req.body,
    userId: req.session.user.id,
  })

  return ok(res, reminder, 'Reminder created', 201)
}

export async function getReminders(req: Request, res: Response) {
  const reminders = await reminderService.getReminders(req.session.user.id)

  return ok(res, reminders)
}

export async function markReminderSent(req: Request, res: Response) {
  await reminderService.markReminderSent(req.params.id as string)

  return ok(res, null, 'Reminder marked as sent')
}

export async function deleteReminder(req: Request, res: Response) {
  await reminderService.deleteReminder(req.params.id as string)

  return ok(res, null, 'Reminder deleted')
}

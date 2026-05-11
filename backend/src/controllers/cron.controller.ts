import { Request, Response } from 'express'
import { fail, ok } from '../lib/api-response'
import { env } from '../lib/env'
import * as cronService from '../services/cron.service'

export async function triggerReminders(req: Request, res: Response) {
  const { secret } = req.body

  if (secret !== env.CRON_SECRET) {
    return fail(res, 'Invalid cron secret', 403)
  }

  const result = await cronService.processDueReminders()

  return ok(res, result, 'Cron processed successfully')
}

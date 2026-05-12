import { z } from 'zod'

export const createReminderSchema = z.object({
  taskId: z.string(),
  remindAt: z.string(),
  repeatType: z.string().optional(),
  repeatInterval: z.number().optional(),
})

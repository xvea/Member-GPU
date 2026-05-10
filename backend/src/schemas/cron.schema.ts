import { z } from 'zod'

export const triggerCronSchema = z.object({
  secret: z.string().min(5),
})

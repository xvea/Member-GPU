import { z } from 'zod'

export const attachTagSchema = z.object({
  taskId: z.string(),
  tagId: z.string(),
})

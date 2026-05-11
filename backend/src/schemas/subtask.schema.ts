import { z } from 'zod'

export const createSubtaskSchema = z.object({
  taskId: z.string(),
  title: z.string().min(1),
})

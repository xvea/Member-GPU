import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  listId: z.string().optional(),
})

export const updateTaskSchema = z.object({
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  description: z.string().optional(),
  listId: z.string().optional(),
})

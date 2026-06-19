import { z } from 'zod'

export const TaskStatusEnum = z.enum(['todo', 'in_progress', 'done'])
export const TaskPriorityEnum = z.enum(['low', 'medium', 'high'])

export const SubtaskSchema = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  title: z.string(),
  isDone: z.boolean(),
})

// Post-condition
export const TaskSchema = z.object({
  id: z.string().optional(),
  listId: z.string().nullable().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  subtasks: z.array(SubtaskSchema).default([]),
  reminders: z.array(z.any()).default([]),
  taskTags: z.array(z.any()).default([]),
})

// Inferensi Tipe
export type TaskStatus = z.infer<typeof TaskStatusEnum>
export type TaskPriority = z.infer<typeof TaskPriorityEnum>
export type Subtask = z.infer<typeof SubtaskSchema>
export type Task = z.infer<typeof TaskSchema>

// Pre-condition contracts untuk aksi update
export const UpdateTaskStatusContract = z.object({
  id: z.string().min(1, 'ID tidak valid'),
  status: TaskStatusEnum,
})

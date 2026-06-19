import { TaskPriority, TaskStatus } from './contracts'

export const STATUS_UI_CONFIG: Record<TaskStatus, { label: string; bg: string; text: string }> = {
  todo: { label: 'To Do', bg: 'bg-muted', text: 'text-muted-foreground' },
  in_progress: { label: 'In Progress', bg: 'bg-primary/10', text: 'text-primary' },
  done: { label: 'Done', bg: 'bg-secondary', text: 'text-secondary-foreground' },
}

export const PRIORITY_UI_CONFIG: Record<TaskPriority, { label: string; colorClass: string }> = {
  low: { label: 'Low', colorClass: 'text-muted-foreground' },
  medium: { label: 'Medium', colorClass: 'text-amber-600 dark:text-amber-500' },
  high: { label: 'High', colorClass: 'text-destructive' },
}

export const TASK_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  todo: ['in_progress'],
  in_progress: ['done'],
  done: ['todo'],
}

export function getNextStatus(current: TaskStatus): TaskStatus | null {
  const possibleTransitions = TASK_TRANSITIONS[current]
  return possibleTransitions.length > 0 ? possibleTransitions[0] : null
}

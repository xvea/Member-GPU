export const taskTransitions: Record<string, string[]> = {
  todo: ['in_progress'],
  in_progress: ['done'],
  done: ['todo'],
}

export function canTransition(current: string, next: string) {
  return taskTransitions[current as keyof typeof taskTransitions]?.includes(next)
}

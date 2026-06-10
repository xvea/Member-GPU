'use client'

import { Checkbox } from './animate-ui/components/base/checkbox'
import { motion } from 'motion/react'

export interface AnimatedTaskProps {
  task: any
  isSelected: boolean
  onSelect: () => void
  onStatusClick: (e: any) => void
}

export function AnimatedTask({ task, isSelected, onSelect, onStatusClick }: AnimatedTaskProps) {
  const isDone = task.status === 'done'

  return (
    <div
      onClick={onSelect}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:bg-accent hover:text-accent-foreground ${
        isSelected ? 'bg-accent' : 'bg-background'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 flex h-5 w-5 shrink-0 items-center justify-center"
      >
        <Checkbox
          nativeButton={true}
          checked={isDone}
          onCheckedChange={() => {
            onStatusClick({ stopPropagation: () => {} })
          }}
          id={`task-${task.id}`}
        />
      </div>

      <div className="relative flex min-w-0 flex-1 items-center">
        <span
          className={`relative z-10 block w-full truncate text-sm font-medium transition-colors ${
            isDone ? 'text-muted-foreground opacity-60' : 'text-foreground'
          }`}
        >
          {task.title}
        </span>

        <motion.svg
          viewBox="0 0 340 32"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-1/2 left-0 z-0 h-8 w-full -translate-y-1/2 overflow-visible"
          initial={false}
          animate={{
            clipPath: isDone ? 'inset(-20% 0% -20% 0%)' : 'inset(-20% 100% -20% 0%)',
            opacity: isDone ? 1 : 0,
          }}
          transition={{
            clipPath: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.1, delay: isDone ? 0 : 0.5 },
          }}
        >
          <path
            d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
            vectorEffect="non-scaling-stroke"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="stroke-primary"
          />
        </motion.svg>
      </div>
    </div>
  )
}

'use client'

import { FlagIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { apiFetch } from '@/lib/api'
import { Task } from '@/lib/contracts'
import { PRIORITY_UI_CONFIG } from '@/lib/ui-config'
import { useState } from 'react'
import { toast } from 'sonner'

interface TaskPriorityProps {
  task: Task
  onUpdated?: () => void
}

type Priority = 'low' | 'medium' | 'high'

const PRIORITIES: Priority[] = ['low', 'medium', 'high']

export function TaskPriority({ task, onUpdated }: TaskPriorityProps) {
  const [loading, setLoading] = useState(false)

  const currentPriority = task.priority as Priority

  const handleChangePriority = async (priority: Priority) => {
    if (priority === currentPriority) return

    setLoading(true)

    try {
      await apiFetch(`/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          priority,
        }),
      })

      toast.success(`Priority changed to ${PRIORITY_UI_CONFIG[priority].label}`)

      onUpdated?.()
    } catch {
      toast.error('Failed to update priority')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            className={`h-8 gap-1.5 text-xs ${
              PRIORITY_UI_CONFIG[currentPriority]?.colorClass || 'text-muted-foreground'
            }`}
          >
            <FlagIcon className="size-4" />

            {PRIORITY_UI_CONFIG[currentPriority]?.label}
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-40">
        {PRIORITIES.map((priority) => (
          <DropdownMenuItem key={priority} onClick={() => handleChangePriority(priority)} className="cursor-pointer">
            <span className={PRIORITY_UI_CONFIG[priority].colorClass}>{PRIORITY_UI_CONFIG[priority].label}</span>

            {priority === currentPriority && ' ✓'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

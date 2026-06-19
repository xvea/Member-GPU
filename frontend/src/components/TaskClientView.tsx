'use client'

import { CheckCircleIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { apiFetch } from '@/lib/api'
import { Task } from '@/lib/contracts'
import { getNextStatus } from '@/lib/ui-config'
import { AnimatedSubtask } from './AnimatedSubtask'
import { AnimatedTask } from './AnimatedTask'
import { TaskLists } from './TaskLists'
import { TaskPriority } from './TaskPriority'
import { TaskReminders } from './TaskReminders'
import { TaskTags } from './TaskTags'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TasksClientViewProps {
  initialTasks: Task[]
  listName?: string
  listId?: string
}

export default function TasksClientView({ initialTasks, listName = 'All Tasks', listId }: TasksClientViewProps) {
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  const handleTransitionStatus = async (e: React.MouseEvent, task: Task) => {
    e.stopPropagation()
    const currentStatus = task.status || 'todo'
    const nextStatus = getNextStatus(currentStatus)
    if (!nextStatus) {
      toast.info('Task is already completed!')
      return
    }

    try {
      await apiFetch(`/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      })
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t)))
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleToggleSubtask = async (taskId: string, subId: string) => {
    try {
      await apiFetch(`/api/v1/subtasks/${subId}/toggle`, { method: 'PATCH' })
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map((st) => (st.id === subId ? { ...st, isDone: !st.isDone } : st)),
              }
            : t
        )
      )
    } catch (error) {
      toast.error('Failed to toggle subtask')
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const payload = { title: newTaskTitle, priority: 'low', status: 'todo', listId }
    const loadingId = toast.loading('Creating task...')

    try {
      const res = await apiFetch<{ data: any }>('/api/v1/tasks', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const createdTask: Task = {
        id: res.data?.id || `${Date.now()}`,
        title: res.data?.title || payload.title,
        description: null,
        status: 'todo',
        priority: res.data?.priority,
        subtasks: [],
        reminders: [],
        taskTags: [],
      }

      setTasks((prev) => [createdTask, ...prev])
      setNewTaskTitle('')
      toast.success('Task created', { id: loadingId })
      router.refresh()
    } catch (error) {
      toast.error('Failed to create task', { id: loadingId })
    }
  }

  const handleUpdateDescription = async (taskId: string, description: string) => {
    try {
      await apiFetch(`/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({ description }),
      })

      // Update state lokal
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, description } : t)))
      toast.success('Description updated')
    } catch (error) {
      toast.error('Failed to update description')
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiFetch(`/api/v1/tasks/${taskId}`, { method: 'DELETE' })
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
      if (selectedTaskId === taskId) setSelectedTaskId(null)
      toast.success('Task deleted')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleCreateSubtask = async (e: React.FormEvent, taskId: string) => {
    e.preventDefault()
    if (!newSubtaskTitle.trim()) return
    try {
      const res = await apiFetch<{ data: any }>('/api/v1/subtasks', {
        method: 'POST',
        body: JSON.stringify({ taskId, title: newSubtaskTitle }),
      })

      const createdSubtask = {
        id: res.data?.id || `${Date.now()}`,
        taskId,
        title: newSubtaskTitle,
        isDone: false,
      }

      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, subtasks: [...t.subtasks, createdSubtask] } : t)))
      setNewSubtaskTitle('')
      router.refresh()
    } catch (error) {
      toast.error('Failed to add subtask')
    }
  }

  const handleDeleteSubtask = async (taskId: string, subId: string) => {
    try {
      await apiFetch(`/api/v1/subtasks/${subId}`, { method: 'DELETE' })
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.filter((st) => st.id !== subId),
              }
            : t
        )
      )
    } catch (error) {
      toast.error('Failed to delete subtask')
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 p-4 transition-all duration-300 md:flex-row md:p-6 lg:gap-6 lg:p-8">
      <Card className="flex h-[500px] max-h-[85vh] w-full shrink-0 flex-col overflow-hidden p-0 md:h-[700px] md:w-[350px] lg:w-[420px]">
        <div className="shrink-0 space-y-4 border-b p-6">
          <h2 className="text-xl font-bold tracking-tight">{listName}</h2>
          <form onSubmit={handleCreateTask} className="relative">
            <PlusIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Add new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="pl-9"
            />
          </form>
        </div>

        <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto p-6">
          {tasks.length === 0 ? (
            <div className="mt-10 text-center text-sm text-muted-foreground">No tasks yet.</div>
          ) : (
            tasks.map((task) => (
              <AnimatedTask
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                onSelect={() => setSelectedTaskId(task.id as string)}
                onStatusClick={(e) => handleTransitionStatus(e, task)}
              />
            ))
          )}
        </div>
      </Card>

      <Card className="flex h-[500px] max-h-[85vh] w-full flex-1 flex-col overflow-hidden p-0 md:h-[700px]">
        {!selectedTask ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
            <CheckCircleIcon weight="light" className="size-16 text-muted-foreground/30" />
            Select a task to view details.
          </div>
        ) : (
          <div className="flex h-full animate-in flex-col overflow-y-auto p-6 duration-200 zoom-in-95 fade-in">
            <div className="mb-6 flex shrink-0 items-start justify-between">
              <h3
                className={`text-2xl font-bold tracking-tight ${selectedTask.status === 'done' ? 'text-muted-foreground line-through opacity-60' : ''}`}
              >
                {selectedTask.title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTask(selectedTask.id as string)}
                className="shrink-0 hover:text-destructive"
              >
                <TrashIcon className="size-5" />
              </Button>
            </div>

            <div className="mb-8 flex shrink-0 flex-wrap gap-2">
              <TaskPriority task={selectedTask} onUpdated={() => router.refresh()} />

              <TaskReminders task={selectedTask} onUpdated={() => router.refresh()} />

              <TaskTags task={selectedTask} onUpdated={() => router.refresh()} />

              <TaskLists task={selectedTask} onUpdated={() => router.refresh()} />
            </div>

            <div className="mb-8 shrink-0">
              <Textarea
                key={selectedTask.id}
                className="min-h-[100px] resize-none"
                placeholder="Add task description here..."
                defaultValue={selectedTask.description || ''}
                onKeyDown={(e) => {
                  // Jika user menekan Enter TANPA menahan Shift
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault() // Mencegah pindah baris
                    handleUpdateDescription(selectedTask.id as string, e.currentTarget.value)
                  }
                }}
                onBlur={(e) => {
                  // Otomatis save jika user selesai mengetik dan klik di luar textarea
                  if (e.currentTarget.value !== (selectedTask.description || '')) {
                    handleUpdateDescription(selectedTask.id as string, e.currentTarget.value)
                  }
                }}
              />
            </div>

            <Separator className="mb-6 w-full shrink-0" />

            <div className="flex min-h-0 flex-col">
              <h4 className="mb-4 flex shrink-0 items-center gap-2 text-sm font-semibold">
                Subtasks
                <span className="text-xs font-normal text-muted-foreground">
                  ({selectedTask.subtasks?.filter((s: any) => s.isDone).length || 0}/
                  {selectedTask.subtasks?.length || 0})
                </span>
              </h4>

              <div className="scrollbar-thin flex max-h-[160px] flex-col gap-1 overflow-y-auto pr-2">
                {selectedTask.subtasks?.map((st: any) => (
                  <AnimatedSubtask
                    key={st.id}
                    id={st.id}
                    title={st.title}
                    isDone={st.isDone}
                    onToggle={(subId) => handleToggleSubtask(selectedTask.id as string, subId)}
                    onDelete={(subId) => handleDeleteSubtask(selectedTask.id as string, subId)}
                  />
                ))}
              </div>

              <form
                onSubmit={(e) => handleCreateSubtask(e, selectedTask.id as string)}
                className="relative mt-4 shrink-0"
              >
                <PlusIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Add new subtask (Enter)..."
                  className="pl-9"
                />
              </form>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

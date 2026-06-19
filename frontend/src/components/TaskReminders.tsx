'use client'

import { ClockIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { apiFetch } from '@/lib/api'
import { Task } from '@/lib/contracts'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Reminder {
  id: string
  taskId: string
  remindAt: string
  repeatType: string | null
  repeatInterval: number
  isSent: boolean
}

interface TaskRemindersProps {
  task: Task
  onUpdated?: () => void
}

const REPEAT_TYPES = ['daily', 'weekly', 'monthly', 'yearly'] as const

export function TaskReminders({ task, onUpdated }: TaskRemindersProps) {
  const [open, setOpen] = useState(false)

  const [date, setDate] = useState<Date>()

  const [hour, setHour] = useState('08')

  const [minute, setMinute] = useState('00')

  const [repeatType, setRepeatType] = useState<string>('daily')

  const [repeatInterval, setRepeatInterval] = useState<number>(1)

  const [loading, setLoading] = useState(false)

  const HOURS = useMemo(() => Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')), [])

  const MINUTES = useMemo(() => Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')), [])

  const reminders = (task.reminders as Reminder[]) || []

  const handleCreateReminder = async () => {
    if (!date) {
      toast.error('Please select reminder date')
      return
    }

    setLoading(true)

    try {
      const remindAt = new Date(date)

      remindAt.setHours(Number(hour))
      remindAt.setMinutes(Number(minute))
      remindAt.setSeconds(0)
      remindAt.setMilliseconds(0)

      await apiFetch('/api/v1/reminders', {
        method: 'POST',
        body: JSON.stringify({
          taskId: task.id,
          remindAt: remindAt.toISOString(),
          repeatType,
          repeatInterval,
        }),
      })

      toast.success('Reminder created')

      setDate(undefined)
      setHour('08')
      setMinute('00')
      setRepeatType('daily')
      setRepeatInterval(1)

      onUpdated?.()
    } catch {
      toast.error('Failed to create reminder')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReminder = async (id: string) => {
    try {
      await apiFetch(`/api/v1/reminders/${id}`, {
        method: 'DELETE',
      })

      toast.success('Reminder removed')

      onUpdated?.()
    } catch {
      toast.error('Failed to remove reminder')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
            <ClockIcon className="size-4" />
            Reminder
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Task Reminders</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
            <h4 className="font-medium">Add Reminder</h4>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button variant="outline" className="w-full justify-start">
                      {date ? format(date, 'dd MMM yyyy') : 'Select date'}
                    </Button>
                  }
                ></PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Hour</label>

                <Select
                  value={hour}
                  // @ts-ignore
                  onValueChange={setHour}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {HOURS.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Minute</label>

                <Select
                  value={minute}
                  // @ts-ignore
                  onValueChange={setMinute}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {MINUTES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Repeat Type</label>

              <Select
                value={repeatType}
                // @ts-ignore
                onValueChange={setRepeatType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {REPEAT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Repeat Interval</label>

              <Input
                min={1}
                type="number"
                value={repeatInterval}
                onChange={(e) => setRepeatInterval(Number(e.target.value) || 1)}
              />
            </div>

            <Button onClick={handleCreateReminder} disabled={loading} className="w-full">
              <PlusIcon className="mr-2 size-4" />
              Create Reminder
            </Button>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Existing Reminders</h4>

            <ScrollArea className="h-64">
              <div className="space-y-2">
                {reminders.length === 0 ? (
                  <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
                    No reminders yet
                  </div>
                ) : (
                  reminders.map((reminder) => (
                    <Card key={reminder.id} className="p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{format(new Date(reminder.remindAt), 'dd MMM yyyy HH:mm')}</p>

                          <p className="text-sm text-muted-foreground">
                            {reminder.repeatType}
                            {' • '}
                            every {reminder.repeatInterval}
                          </p>
                        </div>

                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)}>
                          <TrashIcon className="size-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

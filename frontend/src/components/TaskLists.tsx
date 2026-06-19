'use client'

import { FolderIcon, PlusIcon, XIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { apiFetch } from '@/lib/api'
import { Task } from '@/lib/contracts'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface List {
  id: string
  userId: string
  name: string
  createdAt?: string
}

interface TaskListsProps {
  task: Task
  onUpdated?: () => void
}

export function TaskLists({ task, onUpdated }: TaskListsProps) {
  const [open, setOpen] = useState(false)

  const [lists, setLists] = useState<List[]>([])

  const [newListName, setNewListName] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    loadLists()
  }, [open])

  const loadLists = async () => {
    try {
      const res = await apiFetch<{
        success: boolean
        data: List[]
      }>('/api/v1/lists')

      setLists(res.data ?? [])
    } catch {
      toast.error('Failed to load lists')
    }
  }

  const currentList = useMemo(() => lists.find((list) => list.id === task.listId), [lists, task.listId])

  const availableLists = useMemo(() => lists.filter((list) => list.id !== task.listId), [lists, task.listId])

  const handleAttachList = async (listId: string) => {
    try {
      await apiFetch(`/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          listId,
        }),
      })

      toast.success('List assigned')

      onUpdated?.()
    } catch {
      toast.error('Failed to assign list')
    }
  }

  const handleRemoveList = async () => {
    try {
      await apiFetch(`/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          listId: '',
        }),
      })

      toast.success('List removed')

      onUpdated?.()
    } catch {
      toast.error('Failed to remove list')
    }
  }

  const handleCreateList = async () => {
    if (!newListName.trim()) return

    setLoading(true)

    try {
      const res = await apiFetch<{
        success: boolean
        data: List
      }>('/api/v1/lists', {
        method: 'POST',
        body: JSON.stringify({
          name: newListName.trim(),
        }),
      })

      if (res.data) {
        setLists((prev) => [...prev, res.data])
      }

      setNewListName('')

      toast.success('List created')
    } catch {
      toast.error('Failed to create list')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
            <FolderIcon className="size-4" />
            List
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Task List</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="mb-3 text-sm font-medium">Current List</h4>

            {currentList ? (
              <Badge variant="secondary" className="cursor-pointer gap-1" onClick={handleRemoveList}>
                {currentList.name}

                <XIcon className="size-3" />
              </Badge>
            ) : (
              <p className="text-sm text-muted-foreground">No list assigned</p>
            )}
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Available Lists</h4>

            <ScrollArea className="h-56 rounded-md border">
              <div className="space-y-2 p-3">
                {availableLists.map((list) => (
                  <div key={list.id} className="flex items-center justify-between">
                    <span className="text-sm">{list.name}</span>

                    <Button size="sm" variant="outline" onClick={() => handleAttachList(list.id)}>
                      Assign
                    </Button>
                  </div>
                ))}

                {availableLists.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground">No available lists</div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <h4 className="font-medium">Create New List</h4>

            <div className="flex gap-2">
              <Input placeholder="List name..." value={newListName} onChange={(e) => setNewListName(e.target.value)} />

              <Button disabled={loading || !newListName.trim()} onClick={handleCreateList}>
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

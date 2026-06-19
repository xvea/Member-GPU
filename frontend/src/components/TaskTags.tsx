'use client'

import { PlusIcon, TagIcon, TrashIcon, XIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { apiFetch } from '@/lib/api'
import { Task } from '@/lib/contracts'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Tag {
  id: string
  userId: string
  name: string
}

interface TaskTagRelation {
  taskId: string
  tagId: string
}

interface TaskTagsProps {
  task: Task
  onUpdated?: () => void
}

export function TaskTags({ task, onUpdated }: TaskTagsProps) {
  const [open, setOpen] = useState(false)

  const [tags, setTags] = useState<Tag[]>([])

  const [newTag, setNewTag] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    loadTags()
  }, [open])

  const loadTags = async () => {
    try {
      const res = await apiFetch<{
        success: boolean
        data: Tag[]
      }>('/api/v1/tags')

      setTags(res.data ?? [])
    } catch {
      toast.error('Failed to load tags')
    }
  }

  const attachedTagIds = useMemo(() => new Set((task.taskTags as TaskTagRelation[]).map((t) => t.tagId)), [task])

  const attachedTags = useMemo(() => tags.filter((tag) => attachedTagIds.has(tag.id)), [tags, attachedTagIds])

  const availableTags = useMemo(() => tags.filter((tag) => !attachedTagIds.has(tag.id)), [tags, attachedTagIds])

  const handleCreateTag = async () => {
    if (!newTag.trim()) return

    setLoading(true)

    try {
      const res = await apiFetch<{
        success: boolean
        data: Tag
      }>('/api/v1/tags', {
        method: 'POST',
        body: JSON.stringify({
          name: newTag.trim(),
        }),
      })

      if (res.data) {
        setTags((prev) => [...prev, res.data])
      }

      setNewTag('')

      toast.success('Tag created')
    } catch {
      toast.error('Failed to create tag')
    } finally {
      setLoading(false)
    }
  }

  const handleAttachTag = async (tagId: string) => {
    try {
      await apiFetch('/api/v1/task-tags', {
        method: 'POST',
        body: JSON.stringify({
          taskId: task.id,
          tagId,
        }),
      })

      toast.success('Tag attached')

      onUpdated?.()
    } catch {
      toast.error('Failed to attach tag')
    }
  }

  const handleDetachTag = async (tagId: string) => {
    try {
      await apiFetch(`/api/v1/task-tags/${task.id}/${tagId}`, {
        method: 'DELETE',
      })

      toast.success('Tag removed')

      onUpdated?.()
    } catch {
      toast.error('Failed to remove tag')
    }
  }

  const handleDeleteTag = async (tagId: string) => {
    try {
      await apiFetch(`/api/v1/tags/${tagId}`, {
        method: 'DELETE',
      })

      setTags((prev) => prev.filter((tag) => tag.id !== tagId))

      toast.success('Tag deleted')

      onUpdated?.()
    } catch {
      toast.error('Failed to delete tag')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
            <TagIcon className="size-4" />
            Tags
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Task Tags</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="mb-3 text-sm font-medium">Attached Tags</h4>

            <div className="flex flex-wrap gap-2">
              {attachedTags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tags attached</p>
              ) : (
                attachedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => handleDetachTag(tag.id)}
                  >
                    {tag.name}
                    <XIcon className="size-3" />
                  </Badge>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Available Tags</h4>

            <ScrollArea className="h-48 rounded-md border">
              <div className="space-y-2 p-3">
                {availableTags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <span className="text-sm">{tag.name}</span>

                    <Button size="sm" variant="outline" onClick={() => handleAttachTag(tag.id)}>
                      Attach
                    </Button>
                  </div>
                ))}

                {availableTags.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground">No available tags</div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <h4 className="font-medium">Create New Tag</h4>

            <div className="flex gap-2">
              <Input placeholder="Tag name..." value={newTag} onChange={(e) => setNewTag(e.target.value)} />

              <Button disabled={loading || !newTag.trim()} onClick={handleCreateTag}>
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium text-destructive">Manage Tags</h4>

            <ScrollArea className="h-48 rounded-md border">
              <div className="space-y-2 p-3">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <span className="text-sm">{tag.name}</span>

                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTag(tag.id)}>
                      <TrashIcon className="size-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

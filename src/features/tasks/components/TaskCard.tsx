import { motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { celebrateDone } from '@/lib/celebrate'
import { useTasks } from '../useTasks'
import type { Task } from '../model'

export function TaskCard({ task }: { task: Task }) {
  const { toggle, remove, restore, tasks } = useTasks()
  const index = tasks.findIndex((t) => t.id === task.id)

  function handleToggle() {
    if (!task.done) {
      const checkbox = document.getElementById(`checkbox-${task.id}`)
      if (checkbox) {
        const rect = checkbox.getBoundingClientRect()
        celebrateDone({
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        })
      }
    }
    toggle(task.id)
  }

  function handleDelete() {
    const removedTask = task
    const at = index
    remove(task.id)
    toast('Aufgabe gelöscht', {
      action: { label: 'Rückgängig', onClick: () => restore(removedTask, at) },
      duration: 5000,
    })
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      className="group glass flex min-w-0 items-start gap-3 rounded-xl border p-4 shadow-card transition-look hover:-translate-y-0.5 hover:shadow-pop focus-within:glow"
    >
      <Checkbox
        id={`checkbox-${task.id}`}
        checked={task.done}
        onCheckedChange={handleToggle}
        className="mt-0.5 size-6 rounded-md transition-look data-[state=checked]:animate-pop data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
        aria-label={`«${task.title}» erledigt`}
      />
      <span
        className={`relative flex-1 break-words [overflow-wrap:anywhere] text-base leading-relaxed ${
          task.done ? 'text-muted-foreground' : ''
        }`}
      >
        {task.title}
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-current"
          initial={false}
          animate={{ scaleX: task.done ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        aria-label={`«${task.title}» löschen`}
        className="opacity-60 transition-look group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="size-4" />
      </Button>
    </motion.li>
  )
}

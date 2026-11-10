import { AnimatePresence } from 'motion/react'
import { useTasks } from '../useTasks'
import { TaskCard } from './TaskCard'

export function TaskList() {
  const { tasks } = useTasks()
  return (
    <ul className="flex flex-col gap-3">
      <AnimatePresence initial={false} mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </ul>
  )
}

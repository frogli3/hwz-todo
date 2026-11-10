export type Task = {
  id: string
  title: string
  done: boolean
  createdAt: number
}

const MAX_TITLE_LENGTH = 200

export function addTask(tasks: Task[], rawTitle: string): Task[] {
  const title = rawTitle.trim()
  if (title.length === 0) return tasks
  const task: Task = {
    id: crypto.randomUUID(),
    title: title.slice(0, MAX_TITLE_LENGTH),
    done: false,
    createdAt: Date.now(),
  }
  return [task, ...tasks]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id)
}

export function restoreTask(tasks: Task[], task: Task, index: number): Task[] {
  const at = Math.max(0, Math.min(index, tasks.length))
  return [...tasks.slice(0, at), task, ...tasks.slice(at)]
}

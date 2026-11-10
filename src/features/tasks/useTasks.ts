import { useCallback, useSyncExternalStore } from 'react'
import { addTask, removeTask, restoreTask, toggleTask, type Task } from './model'
import { loadState, saveState, CURRENT_VERSION } from '@/lib/storage'

// Der Zustand wird einmal geladen (erster Aufruf) und über alle Komponenten
// geteilt. Jede Mutation speichert sofort und benachrichtigt alle Zuhörer,
// damit Eingabe und Liste denselben Stand zeigen.
let tasks: Task[] | null = null
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function setTasks(next: Task[]) {
  tasks = next
  saveState({ version: CURRENT_VERSION, tasks: next })
  notify()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  if (tasks === null) tasks = loadState().tasks
  return tasks
}

export function useTasks() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)

  const add = useCallback((title: string) => setTasks(addTask(snapshot, title)), [snapshot])
  const toggle = useCallback((id: string) => setTasks(toggleTask(snapshot, id)), [snapshot])
  const remove = useCallback((id: string) => setTasks(removeTask(snapshot, id)), [snapshot])
  const restore = useCallback(
    (task: Task, index: number) => setTasks(restoreTask(snapshot, task, index)),
    [snapshot],
  )

  return { tasks: snapshot, add, toggle, remove, restore }
}

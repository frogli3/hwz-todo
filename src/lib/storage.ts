import type { Task } from '@/features/tasks/model'

export const CURRENT_VERSION = 1
const STORAGE_KEY = 'hwz-todo'

export type State = {
  version: number
  tasks: Task[]
}

const EMPTY_STATE: State = { version: CURRENT_VERSION, tasks: [] }

export function loadState(): State {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return EMPTY_STATE
  try {
    const parsed = JSON.parse(raw) as Partial<State>
    if (!Array.isArray(parsed.tasks)) return EMPTY_STATE
    return { version: CURRENT_VERSION, tasks: parsed.tasks as Task[] }
  } catch {
    return EMPTY_STATE
  }
}

export function saveState(state: State): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

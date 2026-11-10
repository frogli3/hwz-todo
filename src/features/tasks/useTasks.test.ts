import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadState } from '@/lib/storage'

// useTasks hält einen geteilten Modul-Store. Damit jeder Test isoliert vom
// vorherigen startet, laden wir den Hook pro Test frisch (vi.resetModules).
async function freshUseTasks() {
  vi.resetModules()
  return (await import('./useTasks')).useTasks
}

function seed() {
  localStorage.setItem(
    'hwz-todo',
    JSON.stringify({
      version: 1,
      tasks: [
        { id: 'a', title: 'Einkaufen', done: false, createdAt: 1 },
        { id: 'b', title: 'Zähneputzen', done: true, createdAt: 2 },
      ],
    }),
  )
}

describe('useTasks', () => {
  it('loads stored tasks on mount', async () => {
    seed()
    const useTasks = await freshUseTasks()
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(2)
  })

  it('adds a task, updates state and persists it', async () => {
    seed()
    const useTasks = await freshUseTasks()
    const { result } = renderHook(() => useTasks())
    act(() => result.current.add('Neu'))
    expect(result.current.tasks).toHaveLength(3)
    const stored = loadState()
    expect(stored.tasks).toHaveLength(3)
  })

  it('toggles a task and persists the change', async () => {
    seed()
    const useTasks = await freshUseTasks()
    const { result } = renderHook(() => useTasks())
    act(() => result.current.toggle('a'))
    expect(result.current.tasks.find((t) => t.id === 'a')?.done).toBe(true)
    expect(loadState().tasks.find((t) => t.id === 'a')?.done).toBe(true)
  })

  it('removes a task and persists the change', async () => {
    seed()
    const useTasks = await freshUseTasks()
    const { result } = renderHook(() => useTasks())
    act(() => result.current.remove('a'))
    expect(result.current.tasks.map((t) => t.id)).toEqual(['b'])
    expect(loadState().tasks.map((t) => t.id)).toEqual(['b'])
  })
})

import { describe, expect, it } from 'vitest'
import { addTask, toggleTask, removeTask, restoreTask } from './model'

describe('addTask', () => {
  it('adds a task with a trimmed title at the top', () => {
    const tasks = addTask([], '  Einkaufen  ')
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Einkaufen')
    expect(tasks[0].done).toBe(false)
    expect(tasks[0].id).toBeTruthy()
    expect(typeof tasks[0].createdAt).toBe('number')
  })

  it('ignores an empty or whitespace-only title', () => {
    expect(addTask([], '')).toHaveLength(0)
    expect(addTask([], '   ')).toHaveLength(0)
  })

  it('truncates a title to 200 characters', () => {
    const long = 'x'.repeat(250)
    const result = addTask([], long)
    expect(result[0].title).toHaveLength(200)
  })
})

describe('toggleTask', () => {
  it('flips the done state of the matching task', () => {
    const created = addTask([], 'A')
    const id = created[0].id
    const toggled = toggleTask(created, id)
    expect(toggled[0].done).toBe(true)
    expect(toggleTask(toggled, id)[0].done).toBe(false)
  })

  it('leaves other tasks untouched', () => {
    const created = addTask([], 'A')
    const withB = addTask(created, 'B')
    const toggled = toggleTask(withB, withB[1].id)
    const doneOne = toggled.filter((t) => t.done)
    expect(doneOne).toHaveLength(1)
  })
})

describe('removeTask', () => {
  it('removes the task with the given id', () => {
    const created = addTask([], 'A')
    const withB = addTask(created, 'B')
    const id = created[0].id
    const result = removeTask(withB, id)
    expect(result.map((t) => t.title)).toEqual(['B'])
  })
})

describe('restoreTask', () => {
  it('puts the task back at the given index', () => {
    const tasks = [
      { id: 'a', title: 'A', done: false, createdAt: 2 },
      { id: 'b', title: 'B', done: false, createdAt: 1 },
    ]
    const restored = restoreTask(tasks, { id: 'c', title: 'C', done: false, createdAt: 3 }, 0)
    expect(restored.map((t) => t.id)).toEqual(['c', 'a', 'b'])
  })
})

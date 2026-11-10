import { describe, expect, it } from 'vitest'
import { loadState, saveState, CURRENT_VERSION } from './storage'

describe('loadState', () => {
  it('returns an empty state when the key is missing', () => {
    localStorage.removeItem('hwz-todo')
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('returns an empty state and throws no error on broken JSON', () => {
    localStorage.setItem('hwz-todo', '{kaputt')
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('returns an empty state when the shape is wrong', () => {
    localStorage.setItem('hwz-todo', JSON.stringify({ version: 1, tasks: 'nicht-array' }))
    expect(loadState()).toEqual({ version: CURRENT_VERSION, tasks: [] })
  })

  it('loads stored tasks', () => {
    const stored = { version: 1, tasks: [{ id: '1', title: 'A', done: false, createdAt: 1 }] }
    localStorage.setItem('hwz-todo', JSON.stringify(stored))
    expect(loadState().tasks).toHaveLength(1)
  })
})

describe('saveState', () => {
  it('persists the whole state to localStorage', () => {
    saveState({ version: CURRENT_VERSION, tasks: [{ id: '1', title: 'A', done: false, createdAt: 1 }] })
    const raw = localStorage.getItem('hwz-todo')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!).tasks).toHaveLength(1)
  })
})

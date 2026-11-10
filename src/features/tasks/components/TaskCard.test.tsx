import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TaskList } from './TaskList'
import { Toaster } from '@/components/ui/sonner'
import { celebrateDone } from '@/lib/celebrate'

vi.mock('@/lib/celebrate', () => ({ celebrateDone: vi.fn() }))
const celebrateMock = vi.mocked(celebrateDone)

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

describe('TaskList', () => {
  it('shows stored tasks after render', () => {
    seed()
    render(<TaskList />)
    expect(screen.getByText('Einkaufen')).toBeInTheDocument()
    expect(screen.getByText('Zähneputzen')).toBeInTheDocument()
  })
})

describe('TaskCard interactions', () => {
  it('toggles a task when the checkbox is clicked and celebrates', async () => {
    seed()
    const user = userEvent.setup()
    render(<TaskList />)
    await user.click(screen.getByRole('checkbox', { name: '«Einkaufen» erledigt' }))
    const stored = JSON.parse(localStorage.getItem('hwz-todo')!).tasks
    expect(stored.find((t: { id: string }) => t.id === 'a').done).toBe(true)
    expect(celebrateMock).toHaveBeenCalled()
  })

  it('deletes a task and restores it via Rückgängig', async () => {
    seed()
    const user = userEvent.setup()
    render(
      <>
        <Toaster />
        <TaskList />
      </>,
    )
    await user.click(screen.getByRole('button', { name: '«Einkaufen» löschen' }))
    await waitFor(() => expect(screen.queryByText('Einkaufen')).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Rückgängig' }))
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('hwz-todo')!).tasks as Array<{
        id: string
      }>
      expect(stored.some((t) => t.id === 'a')).toBe(true)
    })
  })
})

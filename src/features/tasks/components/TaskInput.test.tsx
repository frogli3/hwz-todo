import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TaskInput } from './TaskInput'
import { TaskList } from './TaskList'
import { loadState } from '@/lib/storage'

describe('TaskInput', () => {
  it('adds a task on Enter and shows it in the list', async () => {
    const user = userEvent.setup()
    render(
      <>
        <TaskInput />
        <TaskList />
      </>,
    )
    await user.type(screen.getByLabelText('Neue Aufgabe'), 'Einkaufen')
    await user.keyboard('{Enter}')
    expect(screen.getByText('Einkaufen')).toBeInTheDocument()
  })

  it('adds nothing for an empty or whitespace input', async () => {
    const user = userEvent.setup()
    render(
      <>
        <TaskInput />
        <TaskList />
      </>,
    )
    await user.click(screen.getByLabelText('Neue Aufgabe'))
    await user.keyboard('  ')
    await user.keyboard('{Enter}')
    expect(loadState().tasks).toHaveLength(0)
  })

  it('focuses the input when N is pressed', async () => {
    const user = userEvent.setup()
    render(<TaskInput />)
    await user.keyboard('n')
    expect(screen.getByLabelText('Neue Aufgabe')).toHaveFocus()
  })
})

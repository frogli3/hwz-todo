import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressRing } from './ProgressRing'
import App from '@/App'

describe('ProgressRing', () => {
  it('shows the fraction and an accessible label', () => {
    render(<ProgressRing total={5} done={3} />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '3 von 5 erledigt')
    expect(screen.getByText('3/5')).toBeInTheDocument()
  })

  it('shows 0/0 when there are no tasks', () => {
    render(<ProgressRing total={0} done={0} />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '0 von 0 erledigt')
    expect(screen.getByText('0/0')).toBeInTheDocument()
  })
})

describe('EmptyState', () => {
  it('shows a friendly message when there are no tasks', () => {
    localStorage.clear()
    render(<App />)
    expect(screen.getByText('Alles erledigt. Zeit für Kaffee.')).toBeInTheDocument()
  })
})

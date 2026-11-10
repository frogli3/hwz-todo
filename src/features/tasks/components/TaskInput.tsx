import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTasks } from '../useTasks'
import { useHotkey } from '@/lib/useHotkey'

export function TaskInput() {
  const { add } = useTasks()
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useHotkey('n', () => inputRef.current?.focus())

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const title = value.trim()
    if (!title) {
      setShake(true)
      return
    }
    add(title)
    setValue('')
  }

  return (
    <form
      className={`glass flex items-center gap-2 rounded-2xl border p-2 shadow-card ${
        shake ? 'animate-shake' : ''
      }`}
      onSubmit={handleSubmit}
      onAnimationEnd={() => setShake(false)}
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-14 flex-1 border-0 bg-transparent px-4 text-lg shadow-none focus-visible:ring-0"
        placeholder="Was steht an?"
        aria-label="Neue Aufgabe"
        maxLength={200}
      />
      <Button
        type="submit"
        size="icon"
        className="size-12 rounded-xl bg-primary text-primary-foreground transition-look hover:scale-105 active:scale-95"
        aria-label="Aufgabe hinzufügen"
      >
        <Plus className="size-6" />
      </Button>
    </form>
  )
}

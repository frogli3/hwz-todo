import { useEffect } from 'react'

export function useHotkey(key: string, handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      )
        return
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        handler(event)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, handler])
}

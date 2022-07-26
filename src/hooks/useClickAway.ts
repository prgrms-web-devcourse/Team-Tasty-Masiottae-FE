import { useEffect, useRef } from 'react'

const events = ['mousedown', 'touchstart']
// addEventListener('mousedown', (e) => console.log(e))
// addEventListener('touchstart', (e) => console.log(e))

const useClickAway = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleEvent = (e: Event) =>
      !element.contains(e.target as Node) && handler()

    for (const event of events) {
      document.addEventListener(event, handleEvent)
    }

    return () => {
      for (const event of events) {
        document.addEventListener(event, handleEvent)
      }
    }
  }, [handler])

  return ref
}

export default useClickAway

import { useCallback, useRef, useEffect } from 'react'

type IntersectionCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void

const useIntersectionObserver = (
  onIntersect: IntersectionCallback,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer)
      })
    },
    [onIntersect]
  )

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(callback, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options, callback])

  return ref
}

export default useIntersectionObserver

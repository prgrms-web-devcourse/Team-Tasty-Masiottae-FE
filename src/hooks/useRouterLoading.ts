import { useRouter } from 'next/router'
import { useState, useCallback, useEffect } from 'react'

function useRouterLoading() {
  const router = useRouter()
  const [isRouterChange, setIsRouterChange] = useState(false)
  const handleRouteChangeStart = useCallback(() => {
    setIsRouterChange((isChange) => !isChange)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [handleRouteChangeStart, router.events])

  return isRouterChange
}

export default useRouterLoading

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return [isLoading]
}

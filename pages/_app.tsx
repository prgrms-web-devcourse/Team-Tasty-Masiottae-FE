import '../styles/globals.css'
import Layout from '@components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import theme from '@constants/theme'
import { RecoilRoot } from 'recoil'
import React, { useEffect, useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && setIsLoading(true)
    }
    const handleComplete = (url: string) => {
      url === router.asPath && setIsLoading(false)
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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Layout>
              {isLoading && <Spinner />}
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

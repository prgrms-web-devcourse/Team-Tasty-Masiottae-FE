import '../styles/globals.css'
import Layout from '@components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import theme from '@constants/theme'
import { RecoilRoot } from 'recoil'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp

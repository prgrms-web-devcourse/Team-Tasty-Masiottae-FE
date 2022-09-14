import React from 'react'
import '../styles/globals.css'
import Layout from '@components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import theme from '@constants/theme'
import { RecoilRoot } from 'recoil'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Spinner } from '@components/common'
import { useLoading } from '@hooks/common/useLoading'
import PageTitle from '@components/common/PageTitle'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [isLoading] = useLoading()

  return (
    <>
      <PageTitle />
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
    </>
  )
}

export default MyApp

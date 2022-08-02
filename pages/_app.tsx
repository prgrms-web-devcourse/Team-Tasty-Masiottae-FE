import '../styles/globals.css'
import Layout from '@components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import theme from '@constants/theme'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp

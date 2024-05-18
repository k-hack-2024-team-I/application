import 'normalize.css'
import '@/styles/globals.css'
import '@channel.io/bezier-react/styles.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider, Box, ToastProvider } from '@channel.io/bezier-react'
import { pretendard } from '@/styles/fonts'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = (page: ReactElement) =>
    Component.getLayout?.(page, pageProps) ?? page

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AppProvider themeName="dark">
        <ToastProvider>
          <NiceModal.Provider>
            <Box
              id="pretendard_root"
              className={pretendard.variable}
            >
              {getLayout(<Component {...pageProps} />)}
            </Box>
          </NiceModal.Provider>
        </ToastProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}

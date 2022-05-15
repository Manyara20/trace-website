import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { NextRouter, withRouter } from 'next/router'
import AppLayout from '../components/page-specific/app/layout/AppLayout'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayoutAndRouter = AppProps & {
  Component: NextPageWithLayout
  router: NextRouter
}


function MyApp({ router, Component, pageProps }: AppPropsWithLayoutAndRouter) {
  
  if (router.pathname.startsWith('/app')) {
    return (
      <ChakraProvider>
        <Head>
            <title>Trace</title>
            <meta name="description" content="decentralized product tracing service on the Cardano blockchain" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <Head>
          <title>Trace</title>
          <meta name="description" content="decentralized product tracing service on the Cardano blockchain" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default withRouter( MyApp )

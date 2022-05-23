import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { NextRouter, withRouter } from 'next/router'
import AppLayout from '../components/page-specific/app/layout/AppLayout'

import theme from "../chakra/theme";
import Script from 'next/script'
import TabsScript from '../components/page-specific/TabsScript'


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
      <ChakraProvider theme={theme}>
        <Head>
            <title>Trace | App</title>
            <meta name="description" content="decentralized product tracing service on the Cardano blockchain" />
            <link rel="icon" href="/trace/fingerprint_whiteOnGreen.svg" />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>

        <Script>
        {
          /*
          with global.css
          preventsshowing the focus only when it comes form the mous but not when it comes from the keyborad

          source:
          https://github.com/chakra-ui/chakra-ui/issues/708#issuecomment-1045344924
          */
        `document.body.addEventListener('mousedown', function () {
            document.body.classList.add('js-prevent-focus-using-mouse');
        });

        // Re-enable focus styling when Tab is pressed
        document.body.addEventListener('keydown', function (event) {
            if (event.keyCode === 9) {
            document.body.classList.remove('js-prevent-focus-using-mouse');
            }
        });`
        }
        </Script>
        <TabsScript />
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Head>
          <title>Trace</title>
          <meta name="description" content="decentralized product tracing service on the Cardano blockchain" />
          <link rel="icon" href="/trace/fingerprint_whiteOnGreen.svg" />
      </Head>
      <Component {...pageProps} />
      <TabsScript />
    </ChakraProvider>
  )
}

export default withRouter( MyApp )

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  
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

export default MyApp

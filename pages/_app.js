// NEXT
import Head from 'next/head';

// CSS
import '../styles/globals.css'

// OWN
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Head>
      <meta name="viewport" content='width=device-width, initial-scale=1' />
    </Head>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp

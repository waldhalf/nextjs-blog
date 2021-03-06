// NEXT
import Head from 'next/head';

// THIRD PARTY
import { Provider } from 'next-auth/client';

// CSS
import '../styles/globals.css'

// OWN
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp

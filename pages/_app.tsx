import '../styles/globals.css'
import { AppPropsWithLayout } from '@/models'
import { EmptyLayout } from '@/components/layout'
import { SWRConfig } from 'swr'
import axiosClient from '@/components/api-client/axios-client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp

import { useState } from 'react'
import { DocsContext } from '../components/DocsContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [docConfig, setDocConfig] = useState({})
  const [api, setApi] = useState('')
  return (
    <DocsContext.Provider value={{ docConfig, setDocConfig, api, setApi }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DocsContext.Provider>
  )
}

export default MyApp

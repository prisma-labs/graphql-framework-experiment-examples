import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next.js × Nexus Todo App</title>
      </Head>
      <p>
        The Todo App will be here one day. For now just go open the{' '}
        <a href="/api/playground">Nexus Playground</a>.
      </p>
    </Layout>
  )
}

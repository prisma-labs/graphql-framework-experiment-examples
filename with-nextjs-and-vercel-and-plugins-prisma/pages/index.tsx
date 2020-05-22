import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next.js × Nexus Todo App</title>
      </Head>
      <p>
        Get <a href="https://www.electronjs.org/apps/graphql-playground">GraphQL PLayground</a> and point it
        at /api/graphql.
      </p>
    </Layout>
  )
}

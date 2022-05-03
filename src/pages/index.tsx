import Head from 'next/head'
import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <Head>
        <title>NextJS Boilerplate</title>
        <meta
          name="description"
          content="Basic project with lints and husky configs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Página Principal</h1>
        <Link href={'login'}>Login</Link>
        <br />
        <Link href={'login'}>Cadastro</Link>
      </main>

      <footer></footer>
    </div>
  )
}

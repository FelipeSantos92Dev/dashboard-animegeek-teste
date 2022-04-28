import Head from 'next/head'

export default function Home() {
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
        <h1>Enjoy this startpoint!</h1>
      </main>

      <footer></footer>
    </div>
  )
}

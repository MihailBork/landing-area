import Head from 'next/head'

const Home = () => (
  <div className="container">
    <Head>
      <title>Template of Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to site!
      </h1>

      <p className="description">
        A little later here will be a cool site
      </p>
    </main>
  </div>
);

export default Home

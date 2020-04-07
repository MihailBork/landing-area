import React from 'react';
import Head from 'next/head';

const Auth = () => (
  <div className="container">
    <Head>
      <title>Authorization page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Need to authorize here
      </h1>

      <p className="description">
        This is public route
      </p>
    </main>
  </div>
);

export default Auth;

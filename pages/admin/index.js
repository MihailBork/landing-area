import Head from 'next/head';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import _ from 'lodash';

const Admin = () => (
  <div className="container">
    <Head>
      <title>Admin page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Welcome to admin panel!
      </h1>

      <p className="description">
        This is protected route
      </p>
    </main>
  </div>
);

Admin.getInitialProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  if (!_.get(cookies, 'profile')) {
    ctx.res.writeHead(302, {
      Location: '/auth',
    });
    ctx.res.end();
  }
  return {};
};

export default Admin;

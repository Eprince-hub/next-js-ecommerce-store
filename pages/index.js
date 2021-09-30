import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../components/Layout.js';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>My Next And React Shop</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>

      <section style={{ background: 'green' }}>
        <h1>This Should be my Homepage</h1>
      </section>
    </Layout>
  );
}

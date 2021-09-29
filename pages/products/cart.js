import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../../components/Layout.js';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Cart Section</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <h1>This Should be my Cart Page</h1>
    </Layout>
  );
}

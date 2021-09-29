import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../components/Layout.js';

export default function Blog() {
  return (
    <Layout>
      <Head>
        <title>Blog Page</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <h1>This Should be my Blog Page</h1>
    </Layout>
  );
}

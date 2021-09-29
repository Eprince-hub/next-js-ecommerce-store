import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../components/Layout.js';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact Page</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <h1>This Should be my Contact Page</h1>
    </Layout>
  );
}

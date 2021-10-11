import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../../components/Layout.js';

export default function Checkout(props) {
  return (
    <Layout
      catQuantity={props.catQuantity}
      setCartQuantity={props.setCartQuantity}
    >
      <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <h1>This Should be my Checkout Page</h1>
    </Layout>
  );
}

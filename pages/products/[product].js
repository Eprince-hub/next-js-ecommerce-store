import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

// the dynamic rout for single products where each individual product will be displayed with their detail information.

export default function Product() {
  //The useRouter from next will be used for the dynamic routing
  const router = useRouter();
  const { product } = router.query;

  console.log(product);

  return (
    <Layout>
      <Head>
        <title>SINGLE PRODUCT: {product} PAGE</title>
      </Head>

      <h1>THIS IS A SINGLE PRODUCT PAGE</h1>
      <h2>The page belongs to {product}</h2>
    </Layout>
  );
}

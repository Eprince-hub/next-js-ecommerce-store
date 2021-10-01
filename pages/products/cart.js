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

export async function getServerSideProps(context) {
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  console.log('The context contains the following' + context);

  // the property that comes after the query object is the name of the dynamic routing file eg productId
  // console.log(context.query.productId);

  // console.log(DUUMMY_PRODUCTS);

  const productUrl = context.query.productId;

  console.log(productUrl);

  // this function finds any product that will match the id we have in the product object array
  // with the product that the user wants to view the detail in this case.
  const productDetail = DUUMMY_PRODUCTS.find((product) => {
    return productUrl === product.id;
  });

  console.log(productDetail);
  return {
    props: {
      // We are passing the returned product detail to the props from the back end here to make available for use on the front-end

      productDetail,
    },
  };
}

import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const productPageStyle = css`
  background: purple;
`;

// the index page for all products and where i will display all products

// having this props as a parameter gives this function the ability
// to accept the props from the getServerSideProps function down this file
export default function Products(props) {
  return (
    <Layout>
      <section css={productPageStyle}>
        <Head>
          <title>ALL PRODUCTS PAGE</title>
        </Head>

        <h1>THIS IS THE PAGE FOR ALL PRODUCTS</h1>
        <ul>
          {/* mapping through the props value from the getServerSideProps function to get the array of
				products objects */}
          {props.DUUMMY_PRODUCTS.map((product) => {
            return (
              <li key={`product-li-${product.id}`}>
                <h2>{product.name}</h2>

                <img src={product.image} alt={product.name} />

                <h2>
                  {`${product.cost.price}
                   ${product.cost.currency}`}
                </h2>

                <p>{product.title}</p>

                <p>{product.description}</p>

                <Link href={`/products/${product.id}`}>
                  <a>View {product.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

// This is acting like a backend code that enable us communicate with
// backend database file that we created
export async function getServerSideProps() {
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  console.log(DUUMMY_PRODUCTS);

  return {
    props: {
      // productsLists: DUUMMY_PRODUCTS, It can be done this way or as i did it below

      DUUMMY_PRODUCTS,
    },
  };
}

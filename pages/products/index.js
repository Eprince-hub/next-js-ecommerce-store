import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const color = 'green';

const divStyles = css`
  background-color: #ddd;
  margin-top: 20px;
  padding: 10px;
  color: ${color};
`;

// the index page for all products and where i will display all products

export default function Products() {
  return (
    <Layout css={{ divStyles }}>
      <Head>
        <title>ALL PRODUCTS PAGE</title>
      </Head>

      <h1>THIS IS THE PAGE FOR ALL PRODUCTS</h1>
      {/*   <ul>
        {DUUMMY_PRODUCTS.map((product) => {
          return (
            <li key={`product-li-${product.id}`}>
              <h2>{product.name}</h2>

              <img src={product.image} alt={product.name} />

              <h2>
                {product.cost.price} {''}
                {product.cost.currency}
              </h2>

              <p>{product.title}</p>

              <p>{product.description}</p>

              <Link href={`/products/${product.name}`}>
                <a>View {product.name}</a>
              </Link>
            </li>
          );
        })}
      </ul> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  console.log(DUUMMY_PRODUCTS);

  return {
    props: {},
  };
}

// import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
import Head from 'next/head';
// import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout.js';
import SlideShow from '../components/SlideShow.js';

const homePageStyle = css`
  background: green;
  img.imagemin {
    width: 300px;
  }
`;

export default function Home(props) {
  console.log('The product should be down here');
  console.log(props.products);
  return (
    <Layout>
      <Head>
        <title>My Next And React Shop</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>

      <section css={homePageStyle}>
        <SlideShow />

        <section className="productWrapper">
          <h1>LUXURY LIFESTYLE ACCESSORIES WITH DOWN TO EARTH AESTHETICS</h1>
          <ul>
            {props.products
              .filter((product, index) => index <= 8)
              .map((product) => {
                return (
                  <li key={product.id}>
                    <div>
                      <div>
                        <img
                          className="imagemin"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <div>
                          <h3>{product.name}</h3>
                          <p>{`€ ${product.price}`}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { DUUMMY_PRODUCTS } = await import('../util/database');

  console.log('My products should be');
  console.log(DUUMMY_PRODUCTS);

  return {
    props: {
      products: DUUMMY_PRODUCTS,
    },
  };
}

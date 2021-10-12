// import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout.js';
import SlideShow from '../components/SlideShow.js';

const homePageStyle = css`
  background: #f2f2ff;
  width: 100vw;
  min-height: 100vh;

  h1 {
    text-align: center;
  }

  .productWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      width: 80%;
      justify-content: space-around;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;

      li {
        display: relative;
        text-align: center;
        list-style: none;
        margin-bottom: 1rem;
        padding: 1rem 0;

        p {
          font-weight: bold;
        }

        .viewButton {
          text-decoration: none;
          font-size: 1.1rem;
          padding: 0.1rem 0.5rem;
          font-weight: bold;
        }
      }
    }
    img.imagemin {
      height: 500px;
      border-radius: 20px;
    }
  }
`;

export default function Home(props) {
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

        <h1>LUXURY LIFESTYLE ACCESSORIES WITH DOWN TO EARTH AESTHETICS</h1>
        <section className="productWrapper">
          <ul>
            {props.products
              .filter((product, index) => index <= 8)
              .map((product) => {
                return (
                  <li key={product.id}>
                    <div>
                      <div>
                        <Link href="/products">
                          <a>
                            {' '}
                            <img
                              className="imagemin"
                              src={product.image}
                              alt={product.name}
                            />
                          </a>
                        </Link>
                      </div>
                      <div>
                        <div>
                          <h3>{product.name}</h3>
                          <p>{`€ ${product.price}`}</p>
                        </div>
                      </div>
                    </div>

                    <Link href="/products">
                      <a className="viewButton">View products</a>
                    </Link>
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

  return {
    props: {
      products: DUUMMY_PRODUCTS,
    },
  };
}

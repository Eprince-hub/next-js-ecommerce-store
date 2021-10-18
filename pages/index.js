// import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout.js';
import SlideShow from '../components/SlideShow.js';
import { imageURLS } from '../productUtility';

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
      filter: drop-shadow(0.2rem 0.2rem 0.5rem rgba(20, 20, 180, 0.5));
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
                              src={imageURLS[product.id]}
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
  // Product info comming from Database.
  const { getProducts } = await import('../util/database');

  const myProducts = await getProducts();

  return {
    props: {
      products: myProducts,
    },
  };
}

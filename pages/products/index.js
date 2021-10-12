import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const productPageStyle = css`
  width: 100vw;
  min-height: 100vh;
  background: #f2f2ff;
  padding: 2rem;

  h1 {
    text-align: center;
  }

  .productDisplay {
    width: 100%;
    height: inherit;

    ul {
      width: inherit;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      flex-basis: 600px;
      margin: 0;
      padding: 1rem 0;

      a img {
        border-radius: 10px;
        width: 300px;
      }

      li {
        text-align: center;
        border-radius: 1rem;
        height: 38rem;
        padding: 1rem;
        margin: 0;
        list-style: none;
        border: 2px solid grey;

        :hover {
          border-color: #fb2e86;
        }

        .priceAndName {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
        }

        .viewButton {
          display: inline-block;
          font-size: 1.1rem;
          margin: 0.4rem 0 0 0;
          text-decoration: none;
          font-weight: bold;
          color: black;
        }

        .cartViewBox {
          font-weight: bold;
          display: flex;
          justify-content: space-around;
          align-items: center;

          font-size: 1.1.rem;

          .cartButton {
            color: black;
            text-decoration: none;
          }
        }
      }
    }
  }
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

        <h1>SHOP</h1>
        <div className="productDisplay">
          <ul>
            {/* mapping through the props value from the getServerSideProps function to get the array of
				products objects */}
            {props.DUUMMY_PRODUCTS.map((product) => {
              return (
                <li key={`product-li-${product.id}`}>
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <img
                        src={`/images/${product.id}.jpg`}
                        alt={product.name}
                      />{' '}
                      {/* Next Image ain't Working for me */}
                    </a>
                  </Link>

                  <div className="priceAndName">
                    <p>
                      <strong>{product.name}</strong>
                    </p>
                    <p>
                      <strong>{`€ ${product.price}`}</strong>
                    </p>
                  </div>

                  <Link href={`/products/${product.id}`}>
                    <a className="viewButton">View {product.name}</a>
                  </Link>

                  <div>
                    {product.cartInside ? (
                      <div className="cartViewBox">
                        <p>Item is in Cart</p>
                        <Link href="products/cart">
                          <a className="cartButton">View in Cart</a>
                        </Link>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  {/* Please check this to make sure this is what i want, I would like to display an information about the items cart status */}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

// This is acting like a backend code that enable us communicate with
// backend database file that we created
export async function getServerSideProps(context) {
  // Getting the products from the database where it stored!
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  // creating cookies from the cookie we get from the context object
  const cookies = context.req.cookies.cartInside || '[]'; // empty array in case the cookie object is undefined(avoids JSON error)
  const cartInside = JSON.parse(cookies);

  // mapping through all the products and checking if the single product already has the same id that would in the cookie obj
  const itemInsideCart = DUUMMY_PRODUCTS.map((product) => {
    const isTheItemInCart = cartInside.some((userCookieObj) => {
      return Number(product.id) === userCookieObj.id;
    });

    // finding the match for the product object and the cookie object
    const productObj = cartInside.find((cookieObj) => {
      return cookieObj.id === Number(product.id);
    });

    return {
      // using the spread operator to add all the already have property of the product object to new properties created
      ...product,
      cartInside: isTheItemInCart,

      // setting the quantity property and setting it to zero if the item is not already in the cart
      quantity: isTheItemInCart ? productObj.quantityCount : 0, // make sure to check this condition about item increment
    };
  });

  return {
    props: {
      // productsLists: DUUMMY_PRODUCTS, It can be done this way or as i did it below

      DUUMMY_PRODUCTS: itemInsideCart,
    },
  };
}

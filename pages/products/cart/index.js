import { css } from '@emotion/react';
import Head from 'next/head';
import image from 'next/image';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Layout from '../../../components/Layout.js';
import { getParsedCookie } from '../../../util/cookies';

const cartStyles = css`
  max-width: 100vw;
  min-height: 100vh;
  background: #f2f2ff;

  .heading {
    text-align: center;
  }

  .topInfoWrap {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      font-size: 0.8rem;
      border: none;
      cursor: pointer;
      background: transparent;
    }
    div:last-of-type {
      display: flex;
      justify-content: space-around;
      gap: 5px;
      button {
        font-size: 1.1rem;
        padding: 0 1rem;
        background: #191959;
        color: white;
      }

      button:last-of-type {
        background: #353434;
      }
    }
  }

  .cartDisplayWrapper {
    width: 70%;
    margin: 0 auto;
    background: #e1d1f5;

    .itemsCount {
      margin-left: 0.5rem;
    }

    .tableHeaders {
      background: #e1d1f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      margin: 0;

      h2:nth-child(2) {
        width: 250px;
        text-align: right;
      }
    }

    .tableContentWrapper {
      width: 100%;
      ul {
        width: 100%;
        padding: 0;

        li {
          list-style: none;

          .tableDisplayFlex {
            width: 100%;
            padding: 0 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #e1d1f5;
            border-bottom: 2px solid black;

            .itemsBox {
              display: flex;
              justify-content: space-around;
              align-items: flex-start;
              padding: 0;
              max-width: 300px;
              gap: 5px;

              img {
                width: 60px;
              }
            }

            .colorBox {
              margin-left: 1rem;
            }
            .quantityBox {
              width: 100px;
              height: 40px;
              background: #fefefe;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              font-size: 1.2rem;
              border-radius: 10rem;

              p {
                font-weight: bolder;
              }

              button {
                font-size: 1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                flex-basis: 35px;
                height: 35px;
                background: #353434;
                color: white;
                border: none;
                border-radius: 50%;

                span {
                  font-weight: bolder;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  display: inline;
                  border-radius: inherit;
                }
              }
            }

            .priceBox {
              background: #353434;
              color: white;
              width: 100px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              padding: 0;
            }
          }
        }
      }
    }
  }
`;

export default function Cart(props) {
  // getting all the cookie objects back from the browser
  const shoppingCartCookies = getParsedCookie('cartInside') || [];

  const [itemQuantity, setItemQuantity] = useState();

  // finding the product id that matches the cookie object id that i fetched from the browser
  const foundUserWithCookies = shoppingCartCookies.map(
    (individualCookieObj) => {
      const itemAndCookieMatched = props.products.find((product) => {
        return Number(product.id) === individualCookieObj.id;
      });

      return itemAndCookieMatched;
    },
  );

  /*   useEffect(() => {

      const foundUserWithCookies = shoppingCartCookies.map(
        (individualCookieObj) => {
          const itemAndCookieMatched = props.products.find((product) => {
            return Number(product.id) === individualCookieObj.id;
          });

          return itemAndCookieMatched;
        },
      );

  }) */

  console.log('The Quantity IS');
  console.log(itemQuantity);
  console.log('ITEMS AMOUNT IN CART');
  console.log(foundUserWithCookies);

  return (
    <Layout>
      <section css={cartStyles}>
        <Head>
          <title>Cart Section</title>
          <meta
            name="description"
            content="The Best Next eCommerce shop around here"
          />
        </Head>

        <h1 className="heading">SHOPPING CART</h1>

        <div className="topInfoWrap">
          <div>
            <button>BACK TO SHOPPING</button>
          </div>
          <div>
            <button>PayPal Checkout</button>
            <p>OR</p>
            <button>PROCEED WITH YOUR ORDER</button>
          </div>
        </div>

        <div className="cartDisplayWrapper">
          <div>
            <h3 className="itemsCount">
              {foundUserWithCookies.length !== 0
                ? `ITEMS ADDED TO YOUR SHOPPING CART (${foundUserWithCookies.length})`
                : `Your Cart is Empty`}
            </h3>
          </div>

          <div className="tableHeaders">
            <h2>ITEMS</h2>
            <h2>COLOR</h2>
            <h2>Quantity</h2>
            <h2>PRICE</h2>
          </div>

          {/* Return a table for the cart items and prices and quantity and others */}

          <div className="tableContentWrapper">
            <ul>
              {foundUserWithCookies.map((itemWithCookie) => {
                return (
                  <li key={`item-li- ${itemWithCookie.id}`}>
                    <div className="tableDisplayFlex">
                      {/* First row */}

                      <div className="itemsBox">
                        <div>
                          {/*  <image
                            src={`/images/public/${itemWithCookie.id}.jpg`}
                            alt={itemWithCookie.title}
                            width={400}
                            height={500}
                          /> */}
                          <img
                            src={itemWithCookie.image}
                            alt={itemWithCookie.title}
                          />
                        </div>
                        <div>
                          <h3>{itemWithCookie.name}</h3>
                          <p>{itemWithCookie.title}</p>
                        </div>
                      </div>

                      {/* second row */}
                      <div className="colorBox">
                        <p>COLOR COMES HERE</p>
                      </div>
                      {/* Third row */}
                      <div className="quantityBox">
                        <button>
                          <span>&#8722;</span>
                        </button>
                        <p>24{itemWithCookie.quantityCount}</p>
                        <button>
                          <span>&#43;</span>
                        </button>
                      </div>

                      {/* Fourth Row */}
                      <div className="priceBox">
                        <h2>
                          € {''}
                          {itemWithCookie.cost.price}
                        </h2>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Server side code via getServerSideProps

export async function getServerSideProps() {
  const { DUUMMY_PRODUCTS } = await import('../../../util/database');

  return {
    props: {
      products: DUUMMY_PRODUCTS,
    },
  };
}

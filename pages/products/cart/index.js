import { css } from '@emotion/react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
// import image from 'next/image';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Layout from '../../../components/Layout.js';
import getStripe from '../../../lib/get-stripe.js';
import { getParsedCookie, setParsedCookie } from '../../../util/cookies';
import { calculateTotalPrice } from '../../../util/priceChecker';

const cartStyles = css`
  max-width: 100vw;
  min-height: 100vh;
  background: #f2f2ff;
  padding-bottom: 1rem;

  .heading {
    text-align: center;
  }

  .topInfoWrap {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      font-size: 1rem;
      border: none;
      cursor: pointer;
      background: transparent;
      text-decoration: none;
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
    border-radius: 10px;
    padding: 0.5rem;

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
              width: 110px;
              height: 40px;
              background: #fefefe;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              font-size: 1.2rem;
              border-radius: 10rem;
              margin-right: -1.5rem;

              p {
                font-weight: bolder;
                width: 30px;
                text-align: center;
              }

              .deleteFromCart {
                background: #fb2e86;
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
              width: 110px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }

  .totalPriceDisplayBox {
    padding: 0 0.5rem;
    width: 100%auto;
    .itemsPrice,
    .taxPrice,
    .shippingPrice,
    .totalPrice {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 1.2rem;
      }

      strong {
        font-size: 1.2rem;
      }
    }

    .totalPrice strong {
      font-size: 1.5rem;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.5rem;
      background: #353434;
      color: white;
      border-radius: 8px;
    }

    .totalPrice {
      font-weight: bold;
    }
  }
`;

export default function Cart(props) {
  // getting all the cookie objects back from the browser
  const shoppingCartCookies = getParsedCookie('cartInside') || [];

  // setting state variables for all prices related codes!
  const [productsPrice, setProductsPrice] = useState(0);

  // setting the quantities

  // i must check this code and how it works is is still equals zero when i log it in
  const [itemQuantity, setItemQuantity] = useState(0);

  // ######### Try to send the cart quantity to the cookie or local storage and get it from there wherever i need it.

  // const [newCartQuantity, setNewCartQuantity] = useState();

  // const cartQuantityStorage =
  //   typeof window === 'undefined' ? [] : window.localStorage;

  // cartQuantityStorage.setItem('cartQuantity', newCartQuantity);

  // const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);

  // finding the product id that matches the cookie object id that i fetched from the browser
  const foundProductsWithCookie = shoppingCartCookies.map(
    (individualCookieObj) => {
      const itemAndCookieMatched = props.products.find((product) => {
        return Number(product.id) === individualCookieObj.id;
      });
      return itemAndCookieMatched;
    },
  );

  // passing the two set state variables through the useEffect
  useEffect(() => {
    setProductsPrice(calculateTotalPrice(foundProductsWithCookie));
  }, [foundProductsWithCookie]);

  // This is for the new set cart quantity state variable that i am trying to see if i can get from the cookies of local storage
  // useEffect(() => {
  //   setNewCartQuantity(foundProductsWithCookie.length);
  // }, [foundProductsWithCookie]);

  // calculating the tax Price and shipping price and then add all together as the total price.
  const taxPrice = productsPrice * 0.13;
  const shippingPrice = productsPrice > 2000 ? 0 : 50;
  const totalPrice = Number(productsPrice) + (taxPrice + shippingPrice);

  function makeQuantityIncrement(singleProductObj) {
    // getting the current quantity back from the cookie
    const currentCookieQuantity = getParsedCookie('cartInside') || [];

    // the found product with cookie here is an array of all the product objects that is added to the cart
    currentCookieQuantity.find((singleCookieObj) => {
      // i looped over it to find a match for the product in the cart and the corresponding cookie.
      if (Number(singleProductObj.id) === singleCookieObj.id) {
        // i didn't have to return anything so i just used the value true or false to increase the
        // quantity of the item in the cart when true and nothing when not.
        const newQuantityValue = (singleProductObj.quantity += 1);

        // making the cookie quantity the same as the quantity of the items in the cart
        singleCookieObj.quantityCount = newQuantityValue;

        setItemQuantity(newQuantityValue);
      }
    });

    // setting the new cookie quantity to reflect in the browser
    setParsedCookie('cartInside', currentCookieQuantity);
  }

  // function that decreases the quantity

  function makeQuantityDecrement(singleProductObj) {
    // getting the current quantity back from the cookie
    const currentCookieQuantity = getParsedCookie('cartInside') || [];

    // the found product with cookie here is an array of all the product objects that is added to the cart
    currentCookieQuantity.find((singleCookieObj) => {
      if (Number(singleProductObj.id) === singleCookieObj.id) {
        const newQuantityValue = (singleProductObj.quantity -= 1);

        // making the cookie quantity the same as the quantity of the items in the cart
        singleCookieObj.quantityCount = newQuantityValue;

        setItemQuantity(newQuantityValue);
      }
    });

    // setting the new cookie quantity to reflect in the browser
    setParsedCookie('cartInside', currentCookieQuantity);
  }

  // Function that handles decrements limit
  function stopDecrement() {
    console.log('can not be lower than one');
  }

  // #############################
  // function for deleting item from cart

  function itemDeletionHandler(singleProductObj) {
    const currentCookie = getParsedCookie('cartInside') || [];

    const isItemInCart = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(singleProductObj.id);
    });

    let newCookies;

    if (isItemInCart) {
      newCookies = currentCookie.filter((cookieObj) => {
        return cookieObj.id !== Number(singleProductObj.id);
      });

      setParsedCookie('cartInside', newCookies);
    }
  }
  // #######################################
  // TRYING TO IMPLEMENT STRIPE CHECKOUT

  const redirectCheckout = async () => {
    // Create Stripe checkout

    const {
      data: { id },
    } = await axios.post('../api/checkout_sessions', {
      items: Object.entries(foundProductsWithCookie).map(
        ([_, { id, quantity }]) => ({
          price: id,
          quantity,
        }),
      ),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <Layout>
      {' '}
      {/* Check please,, trying to pass props through the layout component */}
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
            <Link href="/products">
              <a className="backToShopping">BACK TO SHOPPING</a>
              {/* Check here for duplicate */}
            </Link>
          </div>
          <div>
            <button>PayPal Checkout</button>
            <p>OR</p>
            <button onClick={redirectCheckout}>PROCEED WITH YOUR ORDER</button>
          </div>
        </div>

        <div className="cartDisplayWrapper">
          <div>
            <h3 className="itemsCount">
              {foundProductsWithCookie.length !== 0
                ? `ITEMS ADDED TO YOUR SHOPPING CART (${foundProductsWithCookie.length})`
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
              {foundProductsWithCookie.map((itemWithCookie) => {
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
                        <p>{itemWithCookie.colorChoice}</p>
                      </div>
                      {/* Third row */}
                      <div className="quantityBox">
                        {itemWithCookie.quantity <= 1 ? (
                          <button
                            className="deleteFromCart"
                            value={itemWithCookie.id}
                            onClick={() => {
                              /* button Show when the quantity equals one or les */
                              itemDeletionHandler(itemWithCookie);
                            }}
                          >
                            <span>&#215;</span>
                          </button>
                        ) : (
                          <button
                            value={itemWithCookie.id}
                            onClick={() => {
                              /* button Show when the quantity greater than one & only decrease when not equals one */
                              itemWithCookie.quantity > 1
                                ? makeQuantityDecrement(itemWithCookie)
                                : stopDecrement();
                            }}
                          >
                            <span>&#8722;</span>
                          </button>
                        )}

                        <p>{itemWithCookie.quantity}</p>

                        <button
                          value={itemWithCookie.id}
                          onClick={() => {
                            /* button always visible for increment*/
                            makeQuantityIncrement(itemWithCookie);
                          }}
                        >
                          <span>&#43;</span>
                        </button>
                      </div>

                      {/* Fourth Row */}
                      <div className="priceBox">
                        <h2>{`€ ${itemWithCookie.price}`}</h2>
                      </div>
                    </div>
                  </li>
                );
              })}

              <div className="totalPriceDisplayBox">
                <div className="itemsPrice">
                  <p>Items Price</p>
                  <strong>{`€ ${productsPrice}`}</strong>
                </div>

                <div className="taxPrice">
                  <p>Tax Price</p>
                  <strong>{`€ ${taxPrice.toFixed(2)}`}</strong>
                </div>

                <div className="shippingPrice">
                  <p>Shipping Price</p>
                  <strong>{`€ ${shippingPrice.toFixed(2)}`}</strong>
                </div>

                <div className="totalPrice">
                  <p>Total Price</p>
                  <strong>{`€ ${totalPrice.toFixed(2)}`}</strong>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <button>PROCEED WITH YOUR ORDER</button>
      </section>
    </Layout>
  );
}

// Server side code via getServerSideProps

export async function getServerSideProps(context) {
  // getting the products from the dataBase
  const { DUUMMY_PRODUCTS } = await import('../../../util/database');

  // i get information back from the cookie in the browser which should be the cookies that the user
  // has created as he or she clicked the add to cart button which means that the information contained in this cookies
  // should have a matching product from the database
  const cookies = context.req.cookies.cartInside || '[]';
  const cartInside = JSON.parse(cookies);

  // mapping through the products array and getting the match between the information from the cookies and the matching products.
  const itemInsideCart = DUUMMY_PRODUCTS.map((product) => {
    const isTheItemInCart = cartInside.some((productCookieObj) => {
      return Number(product.id) === productCookieObj.id;
    });

    const userObj = cartInside.find((cookieOBJ) => {
      return cookieOBJ.id === Number(product.id);
    });

    if (isTheItemInCart) {
      return {
        ...product,
        cartInside: isTheItemInCart,

        // if the item is in the cart then the quantity i got back from the cookie should be added to it, if not, it should be null.
        quantity: isTheItemInCart ? userObj.quantityCount : null,

        // if the item is in the cart then the color i got back from the cookie should be added to it, if not, it should be ''.
        colorChoice: isTheItemInCart ? userObj.color : '',
      };
    } else {
      return ''; /* Make sure this is working the way it should */
    }
  });

  return {
    props: {
      products: itemInsideCart,
      // products: DUUMMY_PRODUCTS || null
    },
  };
}

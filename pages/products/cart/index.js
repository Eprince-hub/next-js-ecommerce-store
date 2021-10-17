import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import image from 'next/image';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Layout from '../../../components/Layout.js';
import { getParsedCookie, setParsedCookie } from '../../../util/cookies';
import { calculateTotalPrice } from '../../../util/priceChecker';
import {
  extractPositiveCookieValues,
  setQuantityLocalStorage,
} from '../../../util/utilityFunctions';

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

  // The products coming from the data base, already filtered
  const [cartProducts, setCartProducts] = useState(props.products);

  // Call a function that filters the positive cookie value and save the result to the state variable filtered cookies
  const [filteredCookies, setFilteredCookies] = useState(
    extractPositiveCookieValues(shoppingCartCookies),
  );

  // getting the total quantity of items in the cart for display on the header and other updates.
  const [cartItemQuantity, setCartItemQuantity] = useState(
    cartProducts.map((productQuantity) => productQuantity.quantity),
  );

  // setting state variables for all prices
  const [productsPrice, setProductsPrice] = useState(0);

  // passing the product price state variable through a useEffect, needs to be called with two dependencies (cartProducts, cartItemQuantity)
  useEffect(() => {
    setQuantityLocalStorage(cartProducts); // set the quantity local storage
    setProductsPrice(calculateTotalPrice(cartProducts));
  }, [cartProducts, cartItemQuantity]);

  // calculating the tax Price and shipping price and then add all together as the total price.
  const taxPrice = productsPrice * 0.13;
  const shippingPrice = productsPrice > 2000 ? 0 : 50;
  const totalPrice = Number(productsPrice) + (taxPrice + shippingPrice);

  // increment the quantity per click
  function makeQuantityIncrement(singleProductObj) {
    // the filtered cookies here is an array of all the cookie objects from the browser with positive values
    filteredCookies.find((singleCookieObj) => {
      // i looped over it to find a match for the product in the cart and the corresponding cookie.
      if (Number(singleProductObj.id) === singleCookieObj.id) {
        // if i find a matching ids, then increment by one on each click
        const newQuantityValue = (singleProductObj.quantity += 1);

        // making the cookie quantity the same as the quantity of the items in the cart
        singleCookieObj.quantityCount = newQuantityValue;

        setCartItemQuantity(newQuantityValue); // update the cart Quantity
      }
      return 0; // return nothing
    });

    setFilteredCookies(filteredCookies); // update filtered cookies

    setParsedCookie('cartInside', filteredCookies); // update cookies in the browser
  }

  // function that decreases the quantity
  function makeQuantityDecrement(singleProductObj) {
    // the filtered cookies here is an array of all the cookie objects from the browser with positive values
    filteredCookies.find((singleCookieObj) => {
      if (Number(singleProductObj.id) === singleCookieObj.id) {
        const newQuantityValue = (singleProductObj.quantity -= 1);

        // making the cookie quantity the same as the quantity of the items in the cart
        singleCookieObj.quantityCount = newQuantityValue;

        setCartItemQuantity(newQuantityValue); // update the cart Quantity
      }

      return 0; // return nothing
    });

    setFilteredCookies(filteredCookies); // update filtered cookies

    setParsedCookie('cartInside', filteredCookies); // update cookies in the browser
  }

  // Function that handles decrements limit
  function stopDecrement() {
    console.log('can not be lower than one');
  }

  // delete the item on click!
  function itemDeletionHandler(singleProductObj) {
    let cookieToFilter = []; // variable for the thr cookie objects to be returned

    // filter the products that was not clicked on and save to the products to keep variable
    const productsToKeep = cartProducts.filter((filteredProducts) => {
      const returnedProductToKeep = filteredProducts.id !== singleProductObj.id; // product object in this variable on each iteration
      //  ############################
      cookieToFilter = filteredCookies.filter((cookiesFiltering) => {
        return cookiesFiltering.id !== filteredProducts.id;
      });
      return returnedProductToKeep;
    });

    setFilteredCookies(cookieToFilter); // update the filtered cookies values
    setCartProducts(productsToKeep); // update the products in the cart value
    setParsedCookie('cartInside', cookieToFilter); // update cookies in the browser
  }

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
            <button
              onClick={() => {
                console.log('you clicked on me!');
              }}
              disabled={cartProducts.length !== 0 ? false : true}
            >
              PayPal Checkout
            </button>
            <p>OR</p>
            <button
              onClick={() => {
                console.log('you clicked on me!');
              }}
              disabled={cartProducts.length !== 0 ? false : true}
            >
              PROCEED WITH YOUR ORDER
            </button>
          </div>
        </div>

        <div className="cartDisplayWrapper">
          <div>
            <h3 className="itemsCount">
              {cartProducts.length !== 0
                ? `ITEMS ADDED TO YOUR SHOPPING CART (${cartProducts.length})`
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
              {cartProducts.map((singleCartProduct) => {
                return (
                  <li key={`item-li- ${singleCartProduct.id}`}>
                    <div className="tableDisplayFlex">
                      {/* First row */}

                      <div className="itemsBox">
                        <div>
                          {/*  <image
                            src={`/images/public/${singleCartProduct.id}.jpg`}
                            alt={singleCartProduct.title}
                            width={400}
                            height={500}
                          /> */}
                          <img
                            src={singleCartProduct.image}
                            alt={singleCartProduct.title}
                          />
                        </div>
                        <div>
                          <h3>{singleCartProduct.name}</h3>
                          <p>{singleCartProduct.title}</p>
                        </div>
                      </div>

                      {/* second row */}
                      <div className="colorBox">
                        <p>{singleCartProduct.colorChoice}</p>
                      </div>
                      {/* Third row */}
                      <div className="quantityBox">
                        {singleCartProduct.quantity <= 1 ? (
                          <button
                            className="deleteFromCart"
                            value={singleCartProduct.id}
                            onClick={() => {
                              /* button Show when the quantity equals one or les */
                              itemDeletionHandler(singleCartProduct);
                            }}
                          >
                            <span>&#215;</span>
                          </button>
                        ) : (
                          <button
                            value={singleCartProduct.id}
                            onClick={() => {
                              /* button Show when the quantity greater than one & only decrease when not equals one */
                              singleCartProduct.quantity > 1
                                ? makeQuantityDecrement(singleCartProduct)
                                : stopDecrement();
                            }}
                          >
                            <span>&#8722;</span>
                          </button>
                        )}

                        <p>{singleCartProduct.quantity}</p>

                        <button
                          value={singleCartProduct.id}
                          onClick={() => {
                            /* button always visible for increment*/
                            makeQuantityIncrement(singleCartProduct);
                          }}
                        >
                          <span>&#43;</span>
                        </button>
                      </div>

                      {/* Fourth Row */}
                      <div className="priceBox">
                        <h2>{`€ ${singleCartProduct.price}`}</h2>
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
                  <strong>
                    {cartProducts.length !== 0
                      ? `€ ${shippingPrice.toFixed(2)}`
                      : `€ 0.00`}
                  </strong>
                </div>

                <div className="totalPrice">
                  <p>Total Price</p>
                  <strong>
                    {cartProducts.length !== 0
                      ? `€ ${totalPrice.toFixed(2)}`
                      : `€ 0.00`}
                  </strong>
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
  const { getCartProductsFromCookie, getCookieIds } = await import(
    '../../../util/database'
  );

  // i get information back from the cookie in the browser which should be the cookies that the user
  // has created as he or she clicked the add to cart button which means that the information contained in this cookies
  // should have a matching product from the database
  const cookies = context.req.cookies.cartInside || '[]';
  const cartInside = JSON.parse(cookies);

  // extracting the ids of all the returned cookie object to pass to the DB query.
  const cookieObjectIds = getCookieIds(cartInside);

  console.log('CookieObjectIds: ', cookieObjectIds);

  // getting the matching products of the cookie ids from the DB.
  const productCookieMatch = await getCartProductsFromCookie(cookieObjectIds);

  // mapping through the products array and getting the match between the information from the cookies and the matching products.
  const itemInsideCart = productCookieMatch.map((product) => {
    const isTheItemInCart = cartInside.some((productCookieObj) => {
      return Number(product.id) === productCookieObj.id;
    });

    const userObj = cartInside.find((cookieOBJ) => {
      return cookieOBJ.id === Number(product.id);
    });

    if (isTheItemInCart) {
      console.log('The item in Cart: ', isTheItemInCart);
      return {
        ...product,
        // cartInside: isTheItemInCart,

        // if the item is in the cart then the quantity i got back from the cookie should be added to it, if not, it should be null.
        quantity: isTheItemInCart ? userObj.quantityCount : null,

        // if the item is in the cart then the color i got back from the cookie should be added to it, if not, it should be ''.
        colorChoice: isTheItemInCart ? userObj.color : '',
      };
    } else {
      return ''; /* Make sure this is working the way it should */
    }
  });

  console.log('itemInsideCart:', itemInsideCart);

  return {
    props: {
      products: itemInsideCart,
      // products: myProducts || null
    },
  };
}

// ################################ MUST CHECK FOR OPTIMIZATION ################################

// export async function getServerSideProps(context) {
//   // getting the products from the dataBase
//   const { myProducts, getCartProductsFromCookie, getCookieIds } = await import(
//     '../../../util/database'
//   );

//   // i get information back from the cookie in the browser which should be the cookies that the user
//   // has created as he or she clicked the add to cart button which means that the information contained in this cookies
//   // should have a matching product from the database
//   const cookies = context.req.cookies.cartInside || '[]';
//   const cartInside = JSON.parse(cookies);

//   // extracting the ids of all the returned cookie object to pass to the DB query.
//   const cookieObjectIds = getCookieIds(cartInside);

//   // getting the matching products of the cookie ids from the DB.
//   const productCookieMatch = await getCartProductsFromCookie(cookieObjectIds);

//   console.log('product and cookie match: ', productCookieMatch);

//   console.log('cartInside: ', cartInside);

//   const checkingNewValue = {
//     ...productCookieMatch[2],
//     quantity: 36,
//     colorChoice: 'black',
//   };

//   /* const justChectTheValueAgain = productCookieMatch.map((checkedproduct) => {
//     cartInside.map((cookieItems) => {
//       return {
//         ...checkedproduct,
//         quantity: cookieItems.quantityCount,
//         colorChoice: cookieItems.color,
//       };
//     }); */

//   let newProductObj = [];
//   const justChectTheValueAgain = productCookieMatch.forEach(
//     (checkedproduct) => {
//       cartInside.forEach((cookieItems) => {
//         const productObject = {
//           ...checkedproduct,
//           quantity: cookieItems.quantityCount,
//           colorChoice: cookieItems.color,
//         };
//         /*  return newProductObj.push({
//         ...checkedproduct,
//         quantity: cookieItems.quantityCount,
//         colorChoice: cookieItems.color,
//       }); */

//         return newProductObj.push(productObject);
//       });
//     },
//   );

//   console.log('newProductObj: ', newProductObj);

//   console.log('justChectTheValueAgain: ', justChectTheValueAgain);
//   console.log('checkingNewValue: ', checkingNewValue);
//   for (let i = 0; i < productCookieMatch.length; i++) {
//     const singleObject = productCookieMatch[i];

//     cartInside.map((boomItem) => {
//       singleObject.quantity = boomItem.quantityCount;
//       singleObject.colorChoice = boomItem.color;
//     });

//     console.log('object inside for loop: ', singleObject);
//   }

//   // mapping through the products array and getting the match between the information from the cookies and the matching products.
//   const itemInsideCart = myProducts.map((product) => {
//     const isTheItemInCart = cartInside.some((productCookieObj) => {
//       return Number(product.id) === productCookieObj.id;
//     });

//     const userObj = cartInside.find((cookieOBJ) => {
//       return cookieOBJ.id === Number(product.id);
//     });

//     console.log('userObj:', userObj);

//     if (isTheItemInCart) {
//       console.log('The item in Cart: ', isTheItemInCart);
//       return {
//         // ...productCookieMatch,
//         ...product,
//         // cartInside: isTheItemInCart,

//         // if the item is in the cart then the quantity i got back from the cookie should be added to it, if not, it should be null.
//         quantity: isTheItemInCart ? userObj.quantityCount : null,

//         // if the item is in the cart then the color i got back from the cookie should be added to it, if not, it should be ''.
//         colorChoice: isTheItemInCart ? userObj.color : '',
//       };
//     } else {
//       return ''; /* Make sure this is working the way it should */
//     }
//   });

//   console.log('itemInsideCart:', itemInsideCart);
//   // console.log('productCookieMatch:', productCookieMatch);

//   return {
//     props: {
//       products: itemInsideCart,
//       // products: myProducts || null
//     },
//   };
// }
// #############################
// function for deleting item from cart
/*
  function itemDeletionHandler(singleProductObj) {
    // const currentCookie = getParsedCookie('cartInside') || [];

    const isItemInCart = filteredCookies.some((cookieObj) => {
      return cookieObj.id === Number(singleProductObj.id);
    });

    let newCookies;

    if (isItemInCart) {
      newCookies = filteredCookies.filter((cookieObj) => {
        return cookieObj.id !== Number(singleProductObj.id);
      });

      setParsedCookie('cartInside', newCookies);
    }

    console.log('CART PRODUCT BEFORE FILTER: ', cartProducts);
    const newCartProductValue = cartProducts.filter((singleCartProduct) => {
      return singleCartProduct !== Number(singleProductObj.id);
    });

    console.log('CART PRODUCT AFTER FILTER: ', cartProducts);

    console.log('NEW SET CART QUANTITY VALUE: ', newCartProductValue);
    // setCartProducts(newCartProductValue);

    // console.log('NEW SET CART QUANTITY VALUE: ', setCartProducts);
  }
 */

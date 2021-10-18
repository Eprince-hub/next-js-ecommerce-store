import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Layout from '../../components/Layout.js';
import { setParsedCookie } from '../../util/cookies';
import { calculateTotalPrice } from '../../util/priceChecker.js';
import Success from './success.js';

const checkoutStyle = css`
  width: 100vw;
  min-height: 120vh;
  background-color: #f2f2ff;
  color: #151875;
  .productContainer {
    width: 80%;
    margin: 0 auto;
    display: flex;

    ul {
      padding: 0;
      margin: 0;
      width: 50%;
      li {
        list-style: none;
        width: 100%;
        .productInfoBox {
          width: 100%;
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 2px solid #03aff1;

          .imageBox {
            width: 100px;

            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .priceDetailContainer {
      width: 100%;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 2px solid #03aff1;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .priceAndCustomerInfo {
      width: 50%;
      border: 2px solid #03aff1;
      border-radius: 6px;

      .formContainer {
        width: 100%;
        height: 100%; /* Check Check */

        .form {
          width: 100%;
          height: 100%;

          input,
          select {
            box-shadow: 1px 1px 6px 1px grey;
            caret-color: tomato;
            font-size: 1.2rem;
            margin: 0.2rem 0;
            color: #15188b;

            :focus {
              outline: 2px solid #02b0f4;
            }
          }

          legend {
            font-weight: bold;
          }

          .userPaymentInfo {
            width: 100%;
            height: 60%;

            .customerInfoField {
              height: 100%;

              div.nameContainer {
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                label {
                  display: block;
                }

                input {
                  width: 60%;
                  height: 2.5rem;
                  border-radius: 0.6rem;
                  border: none;
                  margin-bottom: 0.6rem;
                  padding: 0 0.5rem;
                }
              }

              .addressContainer {
                div:first-of-type {
                  width: 100%;
                  margin-bottom: 1rem;
                  input,
                  select {
                    width: 40%;
                    height: 2.5rem;
                    padding: 0 0.5rem;
                    border-radius: 0.6rem;
                    border: none;
                  }

                  select {
                    margin-right: 0.8rem;
                  }

                  label {
                    margin-right: 0.2rem;
                  }
                }
                .postcodeContainer {
                  width: 100%;

                  .address {
                    width: 100%;

                    input {
                      width: 80%;
                      margin-left: 0.5rem;
                    }
                  }

                  .postCode {
                    width: 100%;

                    input {
                      width: 40%;
                      height: 2.5rem;
                      padding: 0 0.5rem;
                      border-radius: 0.6rem;
                      border: none;
                      margin-left: 0.3rem;
                    }
                  }
                }
              }
            }
          }

          .creditCartInfo {
            margin: 0.6rem 0rem;

            input {
              margin-left: 0.3rem;
              border: none;

              :first-of-type {
                width: 50%;
                height: 2rem;
                border-radius: 10px;
                padding: 0 0.5rem;
              }

              :last-of-type {
                width: 80px;
                height: 30px;
                padding: 0 0.5rem;
                border-radius: 5px;
              }
            }

            select {
              margin: 0 0.8rem 0 0.3rem;
              height: 30px;
              border-radius: 5px;
              border: none;
            }
          }

          .submit {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            font-size: 1.2rem;
            padding: 0.6rem 0.8rem;
            font-weight: bold;
            cursor: pointer;
            border: none;
            border-radius: 10px;
            background-color: #151875;
            color: white;
          }
        }
      }
    }
  }
`;

/*
                div:last-of-type {
                  background: red;
                  width: 100%;

                  input {
                    width: 40%;
                    height: 2.5rem;
                    padding: 0 0.5rem;
                    border-radius: 1rem;
                    border: 2px solid tomato;
                  }

                  .address {
                    background: orange;
                    width: 100%;
                  }
                }
 */

export default function Checkout(props) {
  const [productsPrice, setProductsPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProductsPrice(calculateTotalPrice(props.products));
  }, [props.products]);

  // calculating the tax Price and shipping price and then add all together as the total price.
  const taxPrice = productsPrice * 0.13;
  const shippingPrice = productsPrice > 2000 ? 0 : 50;
  const totalPrice = Number(productsPrice) + (taxPrice + shippingPrice);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log('I got a click');
  };

  console.log('Is Open Status: ', isOpen);

  const preventFormDefault = (event) => {
    event.preventDefault();
    togglePopup();
    setParsedCookie('cartInside', []);
  };

  return (
    <Layout>
      <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <section css={checkoutStyle}>
        <div className="productContainer">
          <ul>
            {props.products.map((product) => {
              return (
                <li key={`checkout-li-${product.id}`}>
                  <div className="productInfoBox">
                    <div className="imageBox">
                      <img src={product.image} alt={product.name} />
                    </div>

                    <p>{`QTY: ${product.quantity}`}</p>
                    <p>{`Price: € ${product.price}`}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="priceAndCustomerInfo">
            <div className="priceDetailContainer">
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
                  {props.products.length !== 0
                    ? `€ ${shippingPrice.toFixed(2)}`
                    : `€ 0.00`}
                </strong>
              </div>

              <div className="totalPrice">
                <p>Total Price</p>
                <strong>
                  {props.products.length !== 0
                    ? `€ ${totalPrice.toFixed(2)}`
                    : `€ 0.00`}
                </strong>
              </div>
            </div>

            <div className="formContainer">
              <form className="form">
                <div className="userPaymentInfo">
                  <fieldset className="customerInfoField">
                    <legend>Payment Information</legend>

                    <div className="nameContainer">
                      <div>
                        <label htmlFor="name">First & Last Name</label>
                        <input name="name" id="name" required />
                      </div>
                      <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" id="email" required />
                      </div>
                    </div>

                    <div className="addressContainer">
                      <div>
                        <label htmlFor="countries">Country</label>
                        <select name="country" id="countries" required>
                          <option value=" " selected>
                            Select a country
                          </option>
                          <option value="Austria">Austria</option>
                          <option value="Germany">Germany</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>

                        <label htmlFor="city">City</label>
                        <input name="city" id="city" required />
                      </div>

                      <div className="postcodeContainer">
                        <div className="address">
                          <label htmlFor="address">Address</label>
                          <input name="address" id="address" required />
                        </div>

                        <div className="postCode">
                          <label htmlFor="postalCode">Zip or Postal code</label>
                          <input name="postalCode" id="postalCode" required />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="creditCartInfo">
                  <fieldset>
                    <legend>Card Information:</legend>
                    <label htmlFor="cardNumber">Card number</label>
                    <input
                      type="number"
                      name="cardNumber"
                      id="cardNumber"
                      required
                    />

                    <p>
                      <strong>Expiration Date</strong>
                    </p>
                    <label htmlFor="month">Month</label>
                    <select id="month" name="month" required>
                      <option>month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>

                    <label htmlFor="year">Year</label>
                    <select id="year" name="year" required>
                      <option>year</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                    </select>

                    <label htmlFor="securityCode">Security code</label>
                    <input
                      required
                      type="password"
                      name="securityCode"
                      id="securityCode"
                    />
                  </fieldset>
                </div>
                <input
                  onClick={preventFormDefault}
                  required
                  className="submit"
                  type="submit"
                  name="payment"
                  value={`Process Payment Of ( € ${totalPrice})`}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Success
          handleClose={togglePopup}
          displayStatus={isOpen ? 'block' : 'none'}
        >
          <h1>THANK YOU FOR THE PURCHASE</h1>
          <h2>PAYMENT OF {` € ${totalPrice}`} WAS SUCCESSFUL</h2>
          <span>❤❤❤❤❤❤</span>

          <Link href="/products">
            <a> See More Products</a>
          </Link>
        </Success>
      </section>
    </Layout>
  );
}

// Server Side Props!.

export async function getServerSideProps(context) {
  // getting the products from the dataBase
  const { getCartProductsFromCookie, getCookieIds } = await import(
    '../../util/database'
  );

  const cookies = context.req.cookies.cartInside || '[]';
  const cartInside = JSON.parse(cookies);

  // extracting the ids of all the returned cookie object to pass to the DB query.
  const cookieObjectIds = getCookieIds(cartInside);

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

  return {
    props: {
      products: itemInsideCart,
      // products: myProducts || null
    },
  };
}

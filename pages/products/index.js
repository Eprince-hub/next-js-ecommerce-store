import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const productPageStyle = css`
  background: purple;

  ul a img {
    width: 300px;
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

        <h1>THIS IS THE PAGE FOR ALL PRODUCTS</h1>
        <ul>
          {/* mapping through the props value from the getServerSideProps function to get the array of
				products objects */}
          {props.DUUMMY_PRODUCTS.map((product) => {
            return (
              <li key={`product-li-${product.id}`}>
                <h2>{product.name}</h2>

                <Link href={`/products/${product.id}`}>
                  <a>
                    <img src={`/images/${product.id}.jpg`} alt={product.name} />
                  </a>
                </Link>

                <h2>
                  {`${product.cost.price}
                   ${product.cost.currency}`}
                </h2>

                <p>{product.title}</p>

                <p>{product.description}</p>

                <Link href={`/products/${product.id}`}>
                  <a>View {product.name}</a>
                </Link>

                <div>{product.cartInside ? 'Item is in Cart' : ''}</div>
                {/* Please check this to make sure this is what i want, I would like to display an information about the items cart status */}
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
export async function getServerSideProps(context) {
  // Getting the products from the database where it stored!
  const { DUUMMY_PRODUCTS } = await import('../../util/database');
  console.log(DUUMMY_PRODUCTS);

  // creating cookies from the cookie we get from the context object
  const cookies = context.req.cookies.cartInside || '[]'; // empty array in case the cookie object is undefined(avoids JSON error)
  const cartInside = JSON.parse(cookies);

  // #########
  // troubleshoot
  // console.log('cartInside OBJ: ');
  // console.log(cartInside);

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

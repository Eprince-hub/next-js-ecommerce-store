import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// the dynamic rout for single products where each individual product will be displayed with their detail information.

export default function Product(props) {
  // The useRouter from next will be used for the dynamic routing
  // we use useRouter when we are routing between front end pages
  // it allows us to grab the data from the url on the front end!.
  // when we rout with the backend getServerSideProps or getStaticProps then we don't need useRauter
  // so i am commenting it out for that reason.
  // const router = useRouter();
  // const { product } = router.query;
  // console.log(product);

  // Window object is not available on the back end so we would need to
  // check if it is available in case we want to use it for something like cookies and sessions. like below:
  /* if (typeof window !== 'undefined') {
    console.log(window.localStorage);
  } */

  // the image couldn't link so i used a url instead
  // console.log('Image should be: ' + props.productDetail.image);

  // state variable that will receive the cookie object if there is any of an empty array if none.
  const [cartInside, setCartInside] = useState(
    getParsedCookie('cartInside') || [],
  );

  const itemCookieObj = cartInside.find((cookieObj) => {
    return cookieObj.id === Number(props.productDetail.id); // this finds the cookie object that has the same id as the product obj
  });

  // setting the initial quantity for the individual items starting from zero
  const initialQuantityCount = itemCookieObj ? itemCookieObj.quantityCount : 1; // please check this,, if one or zero.

  // useState for the quantity count state variable
  const [quantityCount, setQuantityCount] = useState(initialQuantityCount);

  console.log('Quantity is:');
  console.log(quantityCount);

  // Function that will add the item to cart when clicked
  function addToCartHandler() {
    const currentCookie = getParsedCookie('cartInside') || []; // we get the current state of the cookie as the browser loads.
    // please check the above code to make sure that i am not repeating myself

    const isItemInCart = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(props.productDetail.id);
    });

    let newCookie;

    if (!isItemInCart) {
      // if the item is not already in the cookie which also mean that it is not in cart
      // then create a new cookie object when the item is added to cart and add it to the existing ones in the new array

      newCookie = [
        ...currentCookie,
        { id: Number(props.productDetail.id), quantityCount: 1 }, // add the new created cookie object.
      ];

      // set the cookie object to the new value and also the cartInside to the new value
      setParsedCookie('cartInside', newCookie);
      setCartInside(newCookie);
    } else {
      // find out if the product is already in the cookie / cart then only increment the quantity by one on each click.
      const cookieObjectFound = currentCookie.find((cookieObj) => {
        return cookieObj.id === Number(props.productDetail.id);
      });

      cookieObjectFound.quantityCount += 1;

      // also set the cookies and the quantity to the new values

      setParsedCookie('cartInside', currentCookie);
      setQuantityCount(cookieObjectFound.quantityCount);
    }
  }

  return (
    <Layout>
      <Head>
        <title>SINGLE PRODUCT: {props.productDetail.title} PAGE</title>
      </Head>

      <h1>THIS IS A SINGLE PRODUCT PAGE</h1>
      <h2>{props.productDetail.name}</h2>
      <div>
        <Image
          src={`/images/${props.productDetail.id}.jpg`}
          alt={props.productDetail.title}
          width={400}
          height={500}
        />
      </div>
      <h2>{`${props.productDetail.cost.price} ${props.productDetail.cost.currency}`}</h2>
      <p>{props.productDetail.description}</p>
      <button onClick={addToCartHandler}>ADD TO CART</button>
    </Layout>
  );
}

// ###############################################
// getServerSideProps receives an object parameter called context which have all of the information
// about the requests that we make and it has properties that we can use to get the url from the backend.
// eg console.log(context.query.productId)
export async function getServerSideProps(context) {
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  // the property that comes after the query object is the name of the dynamic routing file eg productId
  // console.log(context.query.productId);

  // console.log(DUUMMY_PRODUCTS);

  const productUrl = context.query.productId;

  // this function finds any product that will match the id we have in the product object array
  // with the product that the user wants to view the detail in this case.
  // check the product url and id to make sure they are numbers and not string to number comparison.
  const productDetail = DUUMMY_PRODUCTS.find((product) => {
    return productUrl === product.id;
  });

  console.log(productDetail);
  return {
    props: {
      // We are passing the returned product detail to the props from the back end here to make available for use on the front-end

      productDetail,
    },
  };
}

import Head from 'next/head';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

// the dynamic rout for single products where each individual product will be displayed with their detail information.

export default function Product(props) {
  // The useRouter from next will be used for the dynamic routing
  // we use useRouter when we are routing between front end pages
  // it allows us to garb the data from the url on the front end!.
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

  // the image couldnt link so i used a url instead
  // console.log('Image should be: ' + props.productDetail.image);

  return (
    <Layout>
      <Head>
        <title>SINGLE PRODUCT: {props.productDetail.title} PAGE</title>
      </Head>

      <h1>THIS IS A SINGLE PRODUCT PAGE</h1>
      <h2>{props.productDetail.name}</h2>
      <img src={props.productDetail.image} alt={props.productDetail.title} />
      <h2>{`${props.productDetail.cost.price} ${props.productDetail.cost.currency}`}</h2>
      <p>{props.productDetail.description}</p>
      <button>ADD TO CART</button>
    </Layout>
  );
}

// ###############################################
// getServerSideProps receives an object parameter called context which have all of the information
// about the requests that we make and it has properties that we can use to get the url from the backend.
// eg console.loog(context.query.productId)
export async function getServerSideProps(context) {
  const { DUUMMY_PRODUCTS } = await import('../../util/database');

  // the property that comes after the query object is the name of the dynamic routing file eg productId
  // console.log(context.query.productId);

  // console.log(DUUMMY_PRODUCTS);

  const productUrl = context.query.productId;

  // this function finds any product that will match the id we have in the product object array
  // with the product that the user wants to view the detail in this case.
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

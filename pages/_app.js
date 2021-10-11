import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [shoppingCartQuantity, setShoppingCartQuantity] = useState();
  console.log('props from app.js: ', pageProps);
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            *,
            *:before,
            *:after {
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif, Josefin Sans, Lato;
            }
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component
        catQuantity={shoppingCartQuantity}
        setCartQuantity={setShoppingCartQuantity}
        {...pageProps}
      />
      <h1>{shoppingCartQuantity}</h1>;
    </>
  );
}

export default MyApp;

import Footer from './Footer';
import Header from './Header';

// There is a problem with the information i am getting from the cart about the quantity and i have to check it
export default function Layout({ children, ...pageProps }) {
  // console.log('from the layout component');
  // console.log(pageProps);
  // console.log(pageProps.amount);

  console.log('checking value from layout: ', pageProps);
  return (
    <>
      <Header
        catQuantity={pageProps.catQuantity}
        setCartQuantity={pageProps.setCartQuantity}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}

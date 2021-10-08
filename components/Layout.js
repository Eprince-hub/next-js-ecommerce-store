import Footer from './Footer';
import Header from './Header';

// There is a problem with the information i am getting from the cart about the quantity and i have to check it
export default function Layout({ children, ...pageProps }) {
  console.log('from the layout component');
  console.log(pageProps);
  console.log(pageProps.amount);
  return (
    <>
      <Header amount={pageProps.amount} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

import Footer from './Footer';
import Header from './Header';

// There is a problem with the information i am getting from the cart about the quantity and i have to check it
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

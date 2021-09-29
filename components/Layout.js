import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div div style={{ background: 'blue' }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

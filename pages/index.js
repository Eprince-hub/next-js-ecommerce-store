// import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import Head from 'next/head';
// import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout.js';
import SlideShow from '../components/SlideShow.js';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>My Next And React Shop</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>

      <section style={{ background: 'green' }}>
        <SlideShow />
      </section>
    </Layout>
  );
}

import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../components/Layout.js';

export default function Contact(props) {
  return (
    <Layout
      catQuantity={props.catQuantity}
      setCartQuantity={props.setCartQuantity}
    >
      <Head>
        <title>Contact Page</title>
        <meta
          name="description"
          content="The Best Next eCommerce shop around here"
        />
      </Head>
      <section>
        <h1>This Should be my Contact Page</h1>
        <div>
          <form action="#">
            <div>
              <label htmlFor="firstName">First Name: </label>
              <input id="firstName" />
              <label htmlFor="lastName">Last Name: </label>
              <input id="lastName" />
            </div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" />

            <textarea name="textArea" id="textArea" cols="30" rows="10">
              Message:
            </textarea>
          </form>
        </div>
        <div>Place Holder for Pictures and other infos</div>
      </section>
    </Layout>
  );
}

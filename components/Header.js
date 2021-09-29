import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import logoPic from '../public/images/p3.jpg';

const headerStyle = css`
  background: red;
  div {
    width: 1rem;
  }
`;

export default function Header() {
  return (
    <header css={headerStyle}>
      This is my header
      <div>
        <Image src={logoPic} alt="Shop Logo Image" />
      </div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="./products">
          <a>Shop</a>
        </Link>
        <Link href="./about">
          <a>About</a>
        </Link>
        <Link href="./contact">
          <a>Contact</a>
        </Link>
        <Link href="./blog">
          <a>Blog</a>
        </Link>
      </nav>
    </header>
  );
}

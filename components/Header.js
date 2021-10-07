import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { RiLuggageCartFill } from 'react-icons/ri';
import logo from '../public/images/utilityImages/logo-icon.png';

const headerStyle = css`
  width: 100vw;
  height: 8rem;
  padding: 0 1rem;
  background: #f2f2ff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: static; /* Have to check this later! */
  display: relative;

  .logoWrapper {
    /* This style should be for logo */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bolder;

    a {
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      height: 100px;
    }

    span {
      color: #151875;
      margin-left: -1rem;
      font-size: 1.8rem;
    }
  }

  nav {
    background: transparent;

    a {
      display: inline-block;
      color: #151875;
      font-size: 1.3rem;
      padding: 0.5rem 1rem;
      text-decoration: none;
      margin: 0 1.5rem;
      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
      font-family: Josefin Sans;

      :hover {
        -o-transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
        text-decoration: 0.2rem underline;
        font-weight: bold;
      }

      :focus {
        background: gold;
        font-weight: bold;
        color: #fb2e86;
      }
    }
  }

  .searchFieldWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.2rem;
    width: 310px;

    .searchField {
      border: none;
      border-radius: 10px;
      display: inline-block;
      width: 150px;
      padding: 0 1rem;
      font-size: 1.2rem;
      font-weight: bold;
      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
      color: #151875;
      outline-color: #fb2e86;

      ::placeholder {
        font-size: 1.2rem;
        color: #151875;
      }

      :hover,
      :focus {
        -o-transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
        height: 2.2rem;
        width: 300px;
      }
    }
  }

  .userTabs {
    width: 200px;
    display: flex;
    justify-content: center;
    gap: 6px;
    position: relative;
    bottom: 2.5rem;

    .wishListIcon,
    .cartIcon {
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .logIn,
    .register {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }
`;

export default function Header() {
  return (
    <header css={headerStyle}>
      <div className="logoWrapper">
        <Link href="/">
          <a>
            <Image src={logo} alt="Shop logo" />
            <span>Lubag</span>
          </a>
        </Link>
      </div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/products">
          <a>Shop</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </nav>
      <div className="searchFieldWrap">
        <input type="search" placeholder="Search" className="searchField" />
      </div>
      <div className="userTabs">
        <button className="wishListIcon">
          <FaHeart />
        </button>

        <Link href="/products/cart" className="cartIcon">
          <a>
            <RiLuggageCartFill />
          </a>
        </Link>
        <button className="logIn">Login</button>
        <button className="register">Register</button>
      </div>
    </header>
  );
}

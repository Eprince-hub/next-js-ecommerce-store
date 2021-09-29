import { css } from '@emotion/react';

const footerStyle = css`
  background: gold;
`;

export default function Footer() {
  return <footer css={footerStyle}>This is my footer</footer>;
}

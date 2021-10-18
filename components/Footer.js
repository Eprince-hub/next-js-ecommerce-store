import { css } from '@emotion/react';
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from 'react-icons/ti';

const footerStyle = css`
  background: #e1d3f6;
  height: 50vh;
  width: 100vw;
  background-image: url('../images/utilityImages/footer-bg.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 150%;
  color: #151875;
  font-family: Josefin Sans;
  font-size: 1.2rem;
`;

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <p>
        Copyright
        <span>
          <sup>&#169;</sup>
        </span>
        Victor 2021
      </p>

      <div className="socialIcons">
        <TiSocialFacebook />
        <TiSocialInstagram />
        <TiSocialLinkedin />
        <TiSocialTwitter />
      </div>
    </footer>
  );
}

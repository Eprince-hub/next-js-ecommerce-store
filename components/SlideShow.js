import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
import React from 'react';
import { Slide } from 'react-slideshow-image';

const sliderStyle = css`
  .each-fade {
    display: flex;
    width: 100%;
  }

  .each-fade > div {
    width: 75%;
  }

  .each-fade > div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .each-fade p {
    width: 25%;
    font-size: 1em;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0;
    background: #adceed;
  }
`;

const SlideShow = () => {
  const images = ['/images/bg1.jpg', '/images/bg3.jpg', '/images/bg6.jpg'];

  const fadeProperties = {
    duration: 3000,
    pauseOnHover: true,
  };

  return (
    <div css={sliderStyle}>
      <div className="slide-container">
        <Slide {...fadeProperties}>
          <div className="each-fade">
            <div>
              <img src="/images/bg1.jpg" alt="slider0" />
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src="/images/bg3.jpg" alt="slider1" />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src="/images/bg6.jpg" alt="slider2" />
            </div>
            <p>Third Slide</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default SlideShow;

import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
import React from 'react';
import { Slide } from 'react-slideshow-image';

const sliderStyle = css`
  .each-fade {
    display: flex;
    width: 100%;
    height: 100vh;
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
    padding: 0 1.5rem;
  }
`;

const SlideShow = () => {
  /* const images = ['/images/bg1.jpg', '/images/bg3.jpg', '/images/bg6.jpg']; */

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
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
          <div className="each-fade">
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
            <div>
              <img src="/images/bg3.jpg" alt="slider1" />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src="/images/bg6.jpg" alt="slider2" />
            </div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default SlideShow;

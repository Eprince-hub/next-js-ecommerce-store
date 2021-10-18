import { css } from '@emotion/react';

const successStyle = css`
  background: red;
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  .box {
    position: relative;
    width: 70%;
    margin: 0 auto;
    height: 60%;
    max-height: 70vh;
    margin-top: calc(100vh - 85vh - 20px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
    text-align: center;
    font-size: 1.5rem;

    span {
      display: block;
      color: red;
      font-size: 2.6rem;
    }

    a {
      display: inline-block;
      border: 2px solid blue;
      padding: 0.5rem 1rem;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 1rem;
    }

    .closeIcon {
      content: 'X';
      cursor: pointer;
      position: fixed;
      right: calc(15% - 30px);
      top: calc(100vh - 85vh - 33px);
      background: #ededed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      border: 1px solid #999;
      font-size: 30px;
      font-weight: bolder;
    }
  }
`;

export default function Success(props) {
  return (
    <section css={successStyle} style={{ display: props.displayStatus }}>
      <div className="box">
        <button className="closeIcon" onClick={props.handleClose}>
          X
        </button>

        {props.children}
      </div>
    </section>
  );
}

import { styled } from "styled-components";

export const RegisterWrapper = styled.div`
  position: relative;
  height: 100vh;
  z-index: 10;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png);
  background-size: 100% 100%;

  .inputWidth{
    width: 300px;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 45%;

    .header {
      display: flex;
      align-items: center;
      height: 44px;
      .img {
        height: 100%;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .name {
        margin-left: 10px;
        font-size: 25px;
        font-weight: 700;
      }
    }
    .text {
      margin-top: 10px;
      color: gray;
    }
    .form {
      margin-top: 40px;
    }
    .meta {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      color: #1890FF;
      .pushLogin,.home {
        cursor: pointer;
      }
    }
    .submit {
      margin-top: 20px;
    }
  }
`;

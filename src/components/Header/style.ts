import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  color: rgb(37, 37, 38);

  .left {
    width: 200px;
    display: flex;
    align-items: center;
    font-weight: 700;
    .img {
      margin-right: 5px;
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .center {
    flex: 1;
  }
  .right {
    width: 200px;
    text-align: right;
  }
`;

import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  height: 448px;
  text-align: center;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  img {
    width: 153px;
    height: 100px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    input {
      width: 300px;
      height: 45px;
      font-size: 16px;
      line-height: 19px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      color: #999999;
      padding: 5px;

      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }
    }
    button {
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      margin-top: 15px;
      width: 300px;
      height: 45px;
      transition: 0.5s;

      &:hover {
        background: ${darken(0.04, '#ee4d64')};
      }
    }

    span {
      text-align: left;
      font-weight: bold;
      font-size: 14px;
      color: #444444;
      margin-bottom: 5px;
      margin-top: 10px;
    }
  }
`;

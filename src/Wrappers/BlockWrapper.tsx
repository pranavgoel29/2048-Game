import styled from "styled-components";
import theme from "../styles/theme";

 const BlockWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  border-radius: 5px;
  display: flex;
  color: ${theme.secondaryColor};

  .tile {
    background: ${theme.cardBackgroundAccentColor};
    margin: 5px;
    font-family: "Montserrat", sans-serif;
    height: 70px;
    width: 70px;
    border-radius: 5px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }

  .x2 {
    background-color: #eee4da;
    color: #727371;
  }

  .x4 {
    background-color: #ece0ca;
    color: #727371;
  }

  .x8 {
    background-color: #f4b17a;
    color: white;
  }

  .x16 {
    background-color: #f59575;
    color: white;
  }

  .x32 {
    background-color: #f57c5f;
    color: white;
  }

  .x64 {
    background-color: #f65d3b;
    color: white;
  }

  .x128 {
    background-color: #edce71;
    color: white;
  }

  .x256 {
    background-color: #edcc63;
    color: white;
  }

  .x512 {
    background-color: #edc651;
    color: white;
  }

  .x1024 {
    background-color: #eec744;
    color: white;
  }

  .x2048 {
    background-color: #ecc230;
    color: white;
  }

  .x4096 {
    background-color: #fe3d3d;
    color: white;
  }

  .x8192 {
    background-color: #ff2020;
    color: white;
  }
`;

export default BlockWrapper
import styled from "styled-components";
import theme from "../styles/theme";

const ButtonWrapper = styled.div`
  .play-button {
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    background: ${theme.buttonAccentColor};
    border-radius: 10px;
    border: none;
    height: 3rem;
    width: 100%;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    padding: 0px 40px;
    text-align: center;
    color: ${theme.secondaryColor};
  }

  .play-button:hover {
    background: ${theme.buttonAccentColorHover};
  }
`;

export default ButtonWrapper;

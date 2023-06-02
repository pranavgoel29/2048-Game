import styled from "styled-components";
import theme from "../styles/theme";

export const BlockWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  .tile {
    font-family: "Montserrat", sans-serif;
    height: 60px;
    width: 60px;
    border-radius: 5px;
    font-weight: 700;
    display: flex;
    justify-content: center;

    align-items: center;

    font-size: 24px;
  }
  border-radius: 5px;
  margin: 8px;
  display: flex;
  background: ${theme.cardBackgroundAccentColor};

  color: ${theme.secondaryColor};
`;
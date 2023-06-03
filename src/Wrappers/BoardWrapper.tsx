import styled from "styled-components";
import theme from "../styles/theme";

export const BoardWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundAccentColor};
  width: max-content;
  margin: auto;
  display: flex;
  margin-top: 30px;
  padding: 10px;
  border-radius: 12px;

  .gameWon {
    font-family: "Montserrat", sans-serif;
    padding: 40px;
    border-radius: 10px;
    font-size: 34px;
    font-weight: 700;
    background: ${theme.gameWonColor};
    color: ${theme.primaryColor};
  }
`;
import styled from "styled-components";
import theme from "../styles/theme";

export const BoardViewWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-bottom: 40px;
  .gameLost {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Montserrat", sans-serif;
    margin-top: 20px;

    font-weight: 700;
    font-size: 24px;
    color: ${theme.gameLostColor};
  }

  .gameWinningNumber {
    padding: 10px;
    background-color: ${theme.backgroundAccentColor};
    border-radius: 12px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: ${theme.secondaryTextColor};
  }

  .gameInstructions {
    font-family: "Montserrat", sans-serif;
    margin-top: 40px;
    font-size: 20px;
    max-width: 330px;
    color: ${theme.secondaryTextColor};
    b {
      font-family: "Montserrat", sans-serif;
    }
  }
`;

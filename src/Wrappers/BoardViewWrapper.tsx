import styled from "styled-components";
import theme from "../styles/theme";

export const BoardViewWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
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

  .gameInstructions {
    font-family: "Montserrat", sans-serif;
    margin-top: 40px;
    font-size: 20px;
    max-width: 400px;
    color: ${theme.secondaryTextColor};
    b {
      font-family: "Montserrat", sans-serif;
    }
  }
`;
import React from "react";
import Board from "./Board";
import styled from "styled-components";
import theme from "../styles/theme";
import GameInfo from "./GameInfo";

import { useContext } from "react";

const HomeWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .gameInfoSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 22%;
    color: ${theme.secondaryColor};
    margin: 40px 0px 20px 0px;

    h1 {
      font-family: "Montserrat", sans-serif;
    }

    .scoreSection {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .scoreSectionCard {
        padding: 8px;
        border-radius: 5px;
        background: ${theme.gameInfoCardBackgroundAccentColor};
        p {
          font-size: 18px;
          font-weight: 600;
          color: ${theme.primaryColor};
          font-family: "Montserrat", sans-serif;
        }
      }
    }
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <GameInfo />
      <Board />
    </HomeWrapper>
  );
};

export default Home;

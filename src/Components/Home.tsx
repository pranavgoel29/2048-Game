import React, { useEffect } from "react";
import Board from "./Board";
import styled from "styled-components";
import theme from "../styles/theme";
import GameInfo from "./GameInfo";

import { useState } from "react";

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
      font-size: 3rem;
      font-family: "Montserrat", sans-serif;
    }

    .scoreSection {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;

      .scoreSectionCard {
        padding: 8px 12px;
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
  const [gameScore, setGameScoreHome] = useState(0);
  const [bestScore, setBestScoreHome] = useState(() => {
    const localBestObjectString = localStorage.getItem("bestScore");
    const localBestObject = localBestObjectString ? JSON.parse(localBestObjectString) : null;
    return localBestObject ? localBestObject.number : 0;
  });


  
  useEffect(() => {
    if (gameScore >= bestScore) {
      localStorage.setItem(
        "bestScore",
        JSON.stringify({
          number: gameScore,
        })
      );
      setBestScoreHome(gameScore);
    }
  }, [gameScore]);

  return (
    <HomeWrapper>
      <GameInfo currentScore={gameScore} bestScore={bestScore} />
      <Board score={setGameScoreHome} />
    </HomeWrapper>
  );
};

export default Home;

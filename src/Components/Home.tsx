import React, { useEffect } from "react";
import Board from "./Board";
import styled from "styled-components";
import theme from "../styles/theme";
import GameInfo from "./GameInfo";

import { useState } from "react";

const HomeWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .footerSection {
    display: flex;
    padding-bottom: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p,
    a {
      font-size: 18px;
      font-weight: 600;
      color: ${theme.footerTextColor};
      font-family: "Montserrat", sans-serif;
    }

    a: hover {
      color: ${theme.secondaryColor};
    }
  }

  .gameInfoSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 330px;
    width: 20%;
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
    const localBestObject = localBestObjectString
      ? JSON.parse(localBestObjectString)
      : null;
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
      <footer className="footerSection">
        <p>
          Made with love by{" "}
          <a
            className="footer-name"
            target="_blank"
            href="https://github.com/pranavgoel29"
          >
            Pranav Goel
          </a>
        </p>

        <a
          href="https://github.com/pranavgoel29/2048-Game"
          target="_blank"
          className="github-link"
        >
          Github Repo
        </a>
      </footer>
    </HomeWrapper>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { HomeWrapper } from "../Wrappers/HomeWrapper";
import Board from "./Board";
import GameInfo from "./GameInfo";

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

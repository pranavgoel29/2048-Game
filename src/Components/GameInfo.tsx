import React from "react";
import { useState, createContext } from "react";

const GameInfo = () => {
  const [gameScore, setGameScore] = useState(0);

  return (
    <>
      <div className="gameInfoSection">
        <h1>2048 Game</h1>
        <div className="scoreSection">
          <div className="scoreSectionCard">
            <p>Best: {gameScore}</p>
          </div>
          <div className="scoreSectionCard">
            <p>Score: {gameScore}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameInfo;

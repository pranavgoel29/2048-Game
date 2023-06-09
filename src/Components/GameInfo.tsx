import React from "react";

const GameInfo = (gameScore: any) => {
  return (
    <header className="gameInfoSection">
      <h1>2048</h1>
      <div className="scoreSection">
        <div className="scoreSectionCard">
          <p>Score: {gameScore.currentScore}</p>
        </div>
        <div className="scoreSectionCard">
          <p>Best: {gameScore.bestScore}</p>
        </div>
      </div>
    </header>
  );
};

export default GameInfo;

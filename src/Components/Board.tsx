import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils/useEvent";

import { TileWrapper } from "../Wrappers/TileWrapper";
import { BlockWrapper } from "../Wrappers/BlockWrapper";

import { addNumber, compareGrid } from "../utils/gameMoves";
import {
  isGameWon,
  score,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "../utils/swipes";
import ButtonWrapper from "./ButtonWrapper";

const BoardWrapper = styled.div`
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

enum KeyCodes {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
}

const Block = ({ num }) => {
  return (
    <BlockWrapper>
      <div className={`tile ${num <= 4096 ? "x" + num : "x8192"}`}>
        {num !== 0 ? num : ""}
      </div>
    </BlockWrapper>
  );
};

//  Size of the grid
export const gridSize = 4;
export const winningNumber = 2048;

const Board = (scoreSet: any) => {
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    scoreSet.score(gameScore);
  }, [gameScore]);

  let localscore = 0;
  const updateScore = async () => {
    localscore = await score();
    setGameScore(localscore);
  };

  // Generating a 2D array of 'gridSize' will '0' as fill.
  let arrayGrid = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));
  const [grid, setGrid] = useState(arrayGrid);
  const [isWon, setGameWon] = useState(false);

  // Functions required

  // Reset Game
  const resetGame = () => {
    let newGrid = cloneDeep(arrayGrid);
    setGrid(newGrid);
    setGameWon(false);
    initialize(newGrid);
  };

  // - initialize
  const initialize = (newGrid) => {
    // newGrid = newGrid.map((row) => row.map(() => 0));

    // Clear the grid by setting all values to 0

    addNumber(newGrid);
    // console.log("run 1");

    addNumber(newGrid);
    // console.log("run 2");
    // console.table(newGrid);

    setGrid(newGrid);
  };

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = async (e) => {
    let newGrid = cloneDeep(grid);

    // let played = true;

    if (e.keyCode == KeyCodes.DOWN_ARROW && !isWon) {
      console.log("Down");
      newGrid = await swipeDown(newGrid);
      setGameWon(isGameWon(newGrid));
      updateScore();
    } else if (e.keyCode == KeyCodes.UP_ARROW && !isWon) {
      newGrid = await swipeUp(newGrid);
      setGameWon(isGameWon(newGrid));
      updateScore();
    } else if (e.keyCode == KeyCodes.RIGHT_ARROW && !isWon) {
      newGrid = await swipeRight(newGrid);
      setGameWon(isGameWon(newGrid));
      updateScore();
    } else if (e.keyCode == KeyCodes.LEFT_ARROW && !isWon) {
      newGrid = await swipeLeft(newGrid);
      setGameWon(isGameWon(newGrid));
      updateScore();
    } else {
      // played = false;
    }

    // Comparing Keycodes, assuming only arrows keys are pressed.
    let past = cloneDeep(grid);

    let gridChanged = await compareGrid(past, newGrid);

    if (gridChanged) {
      // console.log("Grid Changed: ");
      await addNumber(newGrid);
      setGrid(newGrid);
    }
  };

  // - Reset and Won state

  useEffect(() => {
    console.log("Initialize");
    initialize(cloneDeep(grid));
  }, []);

  useEvent("keydown", keyPressed);

  return (
    <>
      {!isWon ? (
        <>
          <ButtonWrapper>
            <button
              style={{ marginTop: "20px" }}
              className="play-button"
              onClick={() => resetGame()}
            >
              New Game
            </button>
          </ButtonWrapper>
          <BoardWrapper>
            {grid.map((singleRow, index) => {
              return (
                <div key={index}>
                  <TileWrapper>
                    {singleRow.map((digit, digitIndex) => (
                      <Block num={digit} key={digitIndex} />
                    ))}
                  </TileWrapper>
                </div>
              );
            })}
          </BoardWrapper>
        </>
      ) : (
        <>
          <ButtonWrapper>
            <button
              style={{ marginTop: "20px" }}
              className="play-button"
              onClick={() => resetGame()}
            >
              Play Again
            </button>
          </ButtonWrapper>
          <BoardWrapper>
            <div className="gameWon">Game Won!</div>
          </BoardWrapper>
        </>
      )}
    </>
  );
};

export default Board;

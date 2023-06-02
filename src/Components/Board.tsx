import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils/useEvent";

import { TileWrapper } from "../Wrappers/TileWrapper";
import { BlockWrapper } from "../Wrappers/BlockWrapper";
import ButtonWrapper from "../Wrappers/ButtonWrapper";

import { addNumber, compareGrid } from "../utils/gameMoves";
import {
  isGameLost,
  isGameWon,
  score,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "../utils/swipes";
import { BoardWrapper } from "./BoardWrapper";
import { BoardViewWrapper } from "../Wrappers/BoardViewWrapper";

enum KeyCodes {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
}

const Block = ({ num }) => {
  return (
    <BlockWrapper>
      {/* Adding classes to the divs of blocks/tiles to have appropriate colors. */}
      <div className={`tile ${num <= 4096 ? "x" + num : "x8192"}`}>
        {/* Not displaying any when the digit is zero */}
        {num !== 0 ? num : ""}
      </div>
    </BlockWrapper>
  );
};

//  Size of the grid
export const gridSize = 4;

// Winning state/number of the Game
export const winningNumber = 2048;

const Board = (scoreSet: any) => {
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    scoreSet.score(gameScore);
  }, [gameScore]);

  // Generating a 2D array of 'gridSize' will '0' as fill.
  let arrayGrid = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));
  const [grid, setGrid] = useState(arrayGrid);
  const [isWon, setGameWon] = useState(false);
  const [isLost, setGameLost] = useState(false);

  // Functions required

  // Function to update the Score state.
  let localscore = 0;
  const updateScore = async () => {
    localscore = await score();
    setGameScore(localscore);
  };

  // Reset Game
  const resetGame = () => {
    let newGrid = cloneDeep(arrayGrid);

    setGrid(newGrid);
    setGameWon(false);
    setGameLost(false);

    // It will generate two random number and also set the score to 0.
    initialize(newGrid);
  };

  // - initialize
  const initialize = (newGrid) => {
    // Setting the score to zero on initialization.
    setGameScore(0);

    // newGrid = newGrid.map((row) => row.map(() => 0));
    // Clear the grid by setting all values to 0
    addNumber(newGrid);
    // console.log("run 1");
    addNumber(newGrid);
    // console.log("run 2");
    // console.table(newGrid);
    setGrid(newGrid);
  };

  // Function to check all the states of the game, and updating the score as well.
  const operationState = (newGrid) => {
    setGameWon(isGameWon(newGrid));
    setGameLost(isGameLost(newGrid));
    updateScore();
  };

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = async (e) => {
    let newGrid = cloneDeep(grid);

    // let played = true;

    if (e.keyCode == KeyCodes.DOWN_ARROW && !isWon) {
      console.log("Down");
      newGrid = await swipeDown(newGrid);
      operationState(newGrid);
    } else if (e.keyCode == KeyCodes.UP_ARROW && !isWon) {
      newGrid = await swipeUp(newGrid);
      operationState(newGrid);
    } else if (e.keyCode == KeyCodes.RIGHT_ARROW && !isWon) {
      newGrid = await swipeRight(newGrid);
      operationState(newGrid);
    } else if (e.keyCode == KeyCodes.LEFT_ARROW && !isWon) {
      newGrid = await swipeLeft(newGrid);
      operationState(newGrid);
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

  // Initialization useEffect, used to run initialize on mount.
  useEffect(() => {
    console.log("Initialize");
    initialize(cloneDeep(grid));
  }, []);

  // Listening to the 'keyup' event, using keyup instead of keydown as it will reduce the accidental clicks. And looping of clicks as well if someone holds down the key.
  useEvent("keyup", keyPressed);

  return (
    <BoardViewWrapper>
      {!isWon ? (
        <>
          <p className="gameLost">{isLost ? "Game Lost !" : ""}</p>
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

          <p className="gameInstructions">
            <b>HOW TO PLAY:</b> Use your <b>arrow keys (→, ←, ↑, ↓)</b> to move the tiles.
            Tiles with the same number <b>merge into one</b> when they touch.
            Add them up to reach
            <b> 2048!</b>
          </p>
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
    </BoardViewWrapper>
  );
};

export default Board;

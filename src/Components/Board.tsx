import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils/useEvent";

import ButtonWrapper from "../Wrappers/ButtonWrapper";

import { addNumber, compareGrid } from "../utils/gameMoves";
import {
  isGameLost,
  isGameWon,
  score,
  setScoreToZero,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "../utils/swipes";
import { BoardWrapper } from "../Wrappers/BoardWrapper";
import { BoardViewWrapper } from "../Wrappers/BoardViewWrapper";
import Block from "./Block";
import ControlButtonsWrapper from "../Wrappers/ControlButtonsWrapper";
import { breakpoints } from "../styles/Breakpoints";

enum KeyCodes {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
}

export enum GameVariablesGrid {
  //  Size of the grid
  gridSize = 4,
  // Winning state/number of the Game
  winningNumber = 2048,
  twoAppearancePercentage = 0.7,
}

const Board = (scoreSet: any) => {
  const [gameScore, setGameScore] = useState(0);

  const [showContent, setShowContent] = useState(false);

  // Effect to detect the screen size change and show particular content accordingly
  useEffect(() => {
    const handleResize = () => {
      setShowContent(window.innerWidth >= breakpoints.sm);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Effect to detect score and set it.
  useEffect(() => {
    scoreSet.score(gameScore);
  }, [gameScore]);

  // Generating a 2D array of 'gridSize' will '0' as fill.
  let arrayGrid = Array(GameVariablesGrid.gridSize)
    .fill(0)
    .map(() => Array(GameVariablesGrid.gridSize).fill(0));
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

    setGrid([...newGrid]);
    setGameWon(false);
    setGameLost(false);

    // Setting score variable to zero in the utils file.
    setScoreToZero();
    setGameScore(0);

    // It will generate two random number and also set the score to 0.
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

  // Function to check all the states of the game, and updating the score as well.
  const operationState = (newGrid) => {
    setGameWon(isGameWon(newGrid));
   
    updateScore();
  };

  // To prevent the page from scrolling on arrow keys being pressed.
  const keyPressedScroll = (e) => {
    if (
      [
        KeyCodes.DOWN_ARROW,
        KeyCodes.UP_ARROW,
        KeyCodes.RIGHT_ARROW,
        KeyCodes.LEFT_ARROW,
      ].indexOf(e.keyCode) > -1
    ) {
      e.preventDefault();
    }
  };

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = async (e) => {
    let newGrid = cloneDeep(grid);

    // let played = true;

    // Comparing Keycodes, assuming only arrows keys are pressed.
    if (e.keyCode == KeyCodes.DOWN_ARROW && !isWon) {
      // console.log("Down");
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

    // Storing grid state before updation in a new variable to pass it to comparison function.
    let pastGrid = cloneDeep(grid);

    // Checking if the grid changed, basically checking if elements moved.
    let gridChanged = await compareGrid(pastGrid, newGrid);

    if (gridChanged) {
      // console.log("Grid Changed: ");
      await addNumber(newGrid);
      setGrid(newGrid);
      setGameLost(isGameLost(newGrid));
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
  // Scroll prevention
  useEvent("keydown", keyPressedScroll);

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
                  {singleRow.map((digit, digitIndex) => (
                    <Block num={digit} key={digitIndex} />
                  ))}
                </div>
              );
            })}
          </BoardWrapper>

          {!showContent ? (
            <ControlButtonsWrapper>
              <button
                className="play-button"
                onClick={() => keyPressed({ keyCode: KeyCodes.UP_ARROW })}
              >
                Up
              </button>
              <div className="controlButtomBottomRow">
                <button
                  className="play-button"
                  onClick={() => keyPressed({ keyCode: KeyCodes.LEFT_ARROW })}
                >
                  Left
                </button>
                <button
                  className="play-button"
                  onClick={() => keyPressed({ keyCode: KeyCodes.DOWN_ARROW })}
                >
                  Down
                </button>
                <button
                  className="play-button"
                  onClick={() => keyPressed({ keyCode: KeyCodes.RIGHT_ARROW })}
                >
                  Right
                </button>
              </div>
            </ControlButtonsWrapper>
          ) : null}

          <p className="gameInstructions">
            <b>HOW TO PLAY:</b> Use your <b>arrow keys (→, ←, ↑, ↓)</b> to move
            the tiles. Tiles with the same number <b>merge into one</b> when
            they touch. Add them up to reach
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

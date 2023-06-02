import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils/useEvent";

import { TileWrapper } from "../Wrappers/TileWrapper";
import { BlockWrapper } from "../Wrappers/BlockWrapper";

import { addNumber, compareGrid } from './gameMoves';
import { swipeDown, swipeLeft, swipeRight, swipeUp } from "./swipes";

const BoardWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  background: ${theme.backgroundAccentColor};
  width: max-content;
  margin: auto;
  display: flex;
  margin-top: 20px;
  padding: 10px;
  border-radius: 12px;
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

export const gridSize = 4;

const Board = () => {
  //  Size of the grid

  // Generating a 2D array of 'gridSize' will '0' as fill.
  let arrayGrid = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));
  const [grid, setGrid] = useState(arrayGrid);

  // Functions required
  // - initialize
  const initialize = () => {
    let newGrid = cloneDeep(grid);
    // console.table(newGrid);
    addNumber(newGrid);
    console.log("run 1");

    addNumber(newGrid);
    console.log("run 2");
    // console.table(newGrid);

    setGrid(newGrid);
  };

 

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = async (e) => {
    let newGrid = cloneDeep(grid);

    // let played = true;

    if (e.keyCode == KeyCodes.DOWN_ARROW) {
      console.log("Down");
      newGrid = await swipeDown(newGrid);
    } else if (e.keyCode == KeyCodes.UP_ARROW) {
      newGrid = await swipeUp(newGrid);
    } else if (e.keyCode == KeyCodes.RIGHT_ARROW) {
      newGrid = await swipeRight(newGrid);
    } else if (e.keyCode == KeyCodes.LEFT_ARROW) {
      newGrid = await swipeLeft(newGrid);
    } else {
      // played = false;
    }

    // Comparing Keycodes, assuming only arrows keys are pressed.
    let past = cloneDeep(grid);

    let gridChanged = await compareGrid(past, newGrid);

    if (gridChanged) {
      console.log("Grid Changed: ");
      await addNumber(newGrid);
      setGrid(newGrid);
    }
  };

  // - Reset and Won state

  useEffect(() => {
    console.log("Initialize");
    initialize();
  }, []);

  useEvent("keydown", keyPressed);

  return (
    <BoardWrapper>
      {grid.map((singleRow, index) => {
        return (
          <TileWrapper>
            {singleRow.map((digit, digitIndex) => (
              <Block num={digit} key={digitIndex} />
            ))}
          </TileWrapper>
        );
      })}
    </BoardWrapper>
  );
};

export default Board;

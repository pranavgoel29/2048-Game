import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils/useEvent";

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

const BlockWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  height: 80px;
  width: 80px;
  border-radius: 5px;
  font-weight: 700;
  margin: 8px;
  display: flex;
  background: ${theme.cardBackgroundAccentColor};
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${theme.secondaryColor};
`;

enum KeyCodes {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
}

const Block = ({ num }) => {
  return <BlockWrapper>{num !== 0 ? num : ""}</BlockWrapper>;
};

const Board = () => {
  //  Size of the grid
  const gridSize = 4;

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

  const operationsCollection = (row) => {
    row = swipe(row);
    row = combine(row);
    row = swipe(row);
    return row;
  };

  const compareGrid = (a, b) => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (a[i][j] !== b[i][j]) {
          return true;
        }
      }
    }
    return false;
  };

  const flipGrid = (grid) => {
    for (let i = 0; i < gridSize; i++) {
      grid[i].reverse();
    }
    return grid;
  };

  const rotateGrid = (passGrid) => {
    let rotateNewGrid = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(0));

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        rotateNewGrid[i][j] = passGrid[j][i];
      }
    }

    return rotateNewGrid;
  };

  // - add number -  add a new item to the grid
  const addNumber = (newGrid) => {
    // It should pick a random location on the grid having 0 and put 2 or 4 there instead.

    // We can first check if the grid is full or not and are there any spots having 0.

    // Defining type of string array object.
    let options: { x: number; y: number }[] = []; // Array to store the spots having 0.

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === 0) {
          options.push({ x: i, y: j });
        }
      }
    }

    if (options.length > 0) {
      let spot = getRandomItem(options);
      newGrid[spot.x][spot.y] = Math.random() > 0.5 ? 2 : 4;
    }
  };

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = (e) => {
    let newGrid = cloneDeep(grid);

    let flipped = false;
    let rotated = false;
    let played = true;

    if (e.keyCode == KeyCodes.DOWN_ARROW) {
    } else if (e.keyCode == KeyCodes.UP_ARROW) {
      newGrid = flipGrid(newGrid);
      flipped = true;
    } else if (e.keyCode == KeyCodes.RIGHT_ARROW) {
      newGrid = rotateGrid(newGrid);
      rotated = true;
    } else if (e.keyCode == KeyCodes.LEFT_ARROW) {
      newGrid = rotateGrid(newGrid);
      newGrid = flipGrid(newGrid);
      rotated = true;
      flipped = true;
    } else {
      played = false;
    }

    if (played) {
      // Comparing Keycodes, assuming only arrows keys are pressed.
      let past = cloneDeep(grid);
      for (let i = 0; i < gridSize; i++) {
        newGrid[i] = operationsCollection(newGrid[i]);
      }

      // To check if something moved/swiped so we can add a new number. Passing the past version (basically without operations) and new version after operations.

      if (flipped) {
        flipGrid(newGrid);
      }

      if (rotated) {
        newGrid = rotateGrid(newGrid);
        newGrid = rotateGrid(newGrid);
        newGrid = rotateGrid(newGrid);
      }

      let gridChanged = compareGrid(past, newGrid);

      if (gridChanged) {
        console.log("Grid Changed: ", newGrid);
        addNumber(newGrid);
        setGrid(newGrid);
      }
    }
  };

  const getRandomItem = (arr) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
  };

  

  // - Swipes/moves - screenLeft, right, up, down
  const swipe = (row: any[]) => {
    // keep everything in order which is not a zero.
    let arr = row.filter((val) => val);
    let missing = gridSize - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);

    return arr;
  };

  // Combine function
  const combine = (row: any[]) => {
    for (let i = gridSize - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a == b) {
        row[i] = a + b;
        row[i - 1] = 0;
      }
    }
    return row;
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
          <div key={index}>
            {singleRow.map((digit, digitIndex) => (
              <Block num={digit} key={digitIndex} />
            ))}
          </div>
        );
      })}
    </BoardWrapper>
  );
};

export default Board;

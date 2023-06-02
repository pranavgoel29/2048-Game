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

  const getRandomItem = (arr) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * gridSize);
    // get random item
    console.log(randomIndex);
    const item = arr[randomIndex];
    return item;
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

  const filterZero = (row) => {
    return row.filter((num) => num != 0);
  };

  // - Swipes/moves - screenLeft, right, up, down
  const slide = async (row) => {
    row = filterZero(row);
    console.log(row);

    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] == row[i + 1]) {
        row[i] += row[i];
        row[i + 1] = 0;
      }
    }

    row = filterZero(row);

    while (row.length < gridSize) {
      row.push(0);
    }

    return row;
  };

  const swipeUp = async (grid) => {
    for (let r = 0; r < gridSize; r++) {
      let row = grid[r];
      row = await slide(row);
      grid[r] = row;
    }

    return grid;
  };

  const swipeDown = async (grid) => {
    for (let r = 0; r < gridSize; r++) {
      let row = grid[r];
      row.reverse();
      row = await slide(row);
      row.reverse();
      grid[r] = row;
    }

    return grid;
  };

  const swipeLeft = async (grid) => {
    for (let c = 0; c < gridSize; c++) {
      // let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
      let row: any[] = [];
      for (let r = 0; r < gridSize; r++) {
        row.push(grid[r][c]);
      }

      row = await slide(row);

      for (let r = 0; r < gridSize; r++) {
        grid[r][c] = row[r];
      }
    }

    return grid;
  };

  const swipeRight = async (grid) => {
    for (let c = 0; c < gridSize; c++) {
      let row: any[] = [];
      for (let r = 0; r < gridSize; r++) {
        row.push(grid[r][c]);
      }


      row.reverse();
      row = await slide(row);
      row.reverse();

      for (let r = 0; r < gridSize; r++) {
        grid[r][c] = row[r];
      }
    }

    return grid;
  };

  // Key Pressed, lisening to a key being pressed and making a move accordingly.
  const keyPressed = async (e) => {
    let newGrid = cloneDeep(grid);

    // let played = true;

    if (e.keyCode == KeyCodes.DOWN_ARROW) {
      console.log("left");
      newGrid = swipeDown(newGrid);
    } else if (e.keyCode == KeyCodes.UP_ARROW) {
      newGrid = await swipeUp(newGrid);
    } else if (e.keyCode == KeyCodes.RIGHT_ARROW) {
      newGrid = swipeRight(newGrid);
    } else if (e.keyCode == KeyCodes.LEFT_ARROW) {
      newGrid = swipeLeft(newGrid);
    } else {
      // played = false;
    }

    // Comparing Keycodes, assuming only arrows keys are pressed.
    let past = cloneDeep(grid);

    let gridChanged = compareGrid(past, newGrid);

    if (gridChanged) {
      console.log("Grid Changed: ", newGrid);
      addNumber(newGrid);
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

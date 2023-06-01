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

const Block = ({ num }) => {
  return (
    <BlockWrapper>
      {/* {num} */}
      {num !== 0 ? num : ""}
    </BlockWrapper>
  );
};

const Board = () => {
  //  Size of the grid
  const gridSize = 6;

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
  const keyPressed = (e) => {
    let newGrid = cloneDeep(grid);
    if (e.key == " ") {
      for (let i = 0; i < gridSize; i++) {
        newGrid[i] = swipe(newGrid[i]);
      }
      console.log(newGrid);
      addNumber(newGrid);
      setGrid(newGrid);
    }
  };

  const getRandomItem = (arr) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
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

  // - Swipes/moves - screenLeft, right, up, down
  const swipe = (row: any[]) => {
    // keep everything in order which is not a zero.
    let arr = row.filter((val) => val);
    let missing = gridSize - arr.length;
    let zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);

    return arr;
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

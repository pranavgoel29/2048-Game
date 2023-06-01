import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import cloneDeep from "lodash.clonedeep";

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
  const gridSize = 4;
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Functions required
  // - initialize
  const initialize = () => {
    let newGrid = cloneDeep(grid);
    // console.table(newGrid);
    addNumber(newGrid);
    console.log("run 1");
    console.table(newGrid);
    addNumber(newGrid);
    console.log("run 2");
    console.table(newGrid);

    setGrid(newGrid)
  };

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
  }

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
  // - Reset and Won state

  useEffect(() => {
    console.log("Initialize");
    initialize();
  }, []);

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

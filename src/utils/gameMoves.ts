import { GameVariablesGrid } from "../Components/Board";
import { gridType } from "./swipes";

// Function to compare 2 grids and return 'false' if they are 'same' and 'true' if they are 'not'.
 export const compareGrid = (a: gridType, b: gridType) => {
    for (let i = 0; i < GameVariablesGrid.gridSize; i++) {
      for (let j = 0; j < GameVariablesGrid.gridSize; j++) {
        if (a[i][j] !== b[i][j]) {
          return true;
        }
      }
    }
    return false;
  };

  export const getRandomItem = (arr: { x: number; y: number }[]) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    
    const item = arr[randomIndex];
    return item;
  };

  // - add number -  add a new item to the grid
  export const addNumber = async (newGrid: gridType) => {
    // It should pick a random location on the grid having 0 and put 2 or 4 there instead.

    // We can first check if the grid is full or not and are there any spots having 0.

    // Defining type of string array object.
    let options: { x: number; y: number }[] = []; // Array to store the spots having 0.

    for (let i = 0; i < GameVariablesGrid.gridSize; i++) {
      for (let j = 0; j < GameVariablesGrid.gridSize; j++) {
        if (newGrid[i][j] === 0) {
          options.push({ x: i, y: j });
        }
      }
    }

    if (options.length > 0) {
      let spot = getRandomItem(options);

      // 2 has 70% probabilty and 4 has 30% according to the below function.
      newGrid[spot.x][spot.y] = Math.random() <= GameVariablesGrid.twoAppearancePercentage ? 2 : 4;
    }
  };
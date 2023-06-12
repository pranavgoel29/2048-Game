import { GameVariablesGrid } from "../Components/Board";

let gameScore: number = 0;
export type gridType = number[][];

// Function to remove all the zeroes from the given row.
// e.g. -> [2,0,2,4]; will be changed to, [2,2,4]
const filterZero = async (row: number[]) => {
  return row.filter((num) => num != 0);
};

// Function to check if Game is won. Just check if the array has winning variable value and if it does return true.
export const isGameWon = (grid: gridType) => {
  for (let c = 0; c < grid.length; c++) {
    for (let r = 0; r < grid.length; r++) {
      if (grid[c][r] === GameVariablesGrid.winningNumber) {
        return true;
      }
    }
  }
  return false;
};

// Check if Game lost
export const isGameLost = (grid: gridType) => {
  console.log('Game lost grid size',grid.length)
  for (let c = 0; c < grid.length; c++) {
    for (let r = 0; r < grid.length; r++) {
      if (grid[c][r] === 0) {
        return false;
      }
      // It checks if the current cell's value is equal to the value of the cell below it (in the same column)
      if (c !== grid.length - 1 && grid[c][r] === grid[c + 1][r]) {
        return false;
      }
      // It checks if the current cell's value is equal to the value of the cell to its right (in the same row)
      if (r !== grid.length - 1 && grid[c][r] === grid[c][r + 1]) {
        return false;
      }
    }
  }
  return true;
};

// - Swipes/moves - screenLeft, right, up, down
const slide = async (row: number[], gridSizeState: number) => {
  // Removing all the zeroes.
  row = await filterZero(row);

  // console.log("row length: ", row.length);

  // Running the loop till row.length -1 as we don't have to do anything when there is only one element.
  for (let i = 0; i < row.length - 1; i++) {
    // If length is above 1, then check if both the elements are equal.
    if (row[i] === row[i + 1]) {
      // If they are equal add them or we can also multiply by 2 as we only have multiple of two here, we have to do this to the first one of the duo.
      row[i] *= 2;
      gameScore += row[i];

      // Place zero at the second element.
      row[i + 1] = 0;
    }
  }

  row = await filterZero(row);

  // Adding zeroes in-place of empty space according to the 'gridSize'.
  while (row.length < gridSizeState) {
    row.push(0);
  }

  return row;
};

// Function to return the gameScore variable.
const score = () => {
  return gameScore;
};

const setScoreToZero = () => {
  gameScore = 0;
};

const swipeUp = async (grid: gridType, gridSizeState: number) => {
  for (let r = 0; r < gridSizeState; r++) {
    let row = grid[r];
    row = await slide(row, gridSizeState);
    grid[r] = row;
  }

  return grid;
};

// Just reverse of Up function.
const swipeDown = async (grid: gridType, gridSizeState: number) => {
  for (let r = 0; r < gridSizeState; r++) {
    let row = grid[r];
    row.reverse();
    row = await slide(row, gridSizeState);
    row.reverse();
    grid[r] = row;
  }

  return grid;
};

// Here we have to do the tanspose.
const swipeLeft = async (grid: gridType, gridSizeState: number) => {
  for (let c = 0; c < gridSizeState; c++) {
    let row: number[] = [];

    // Transposing on row at a time.
    for (let r = 0; r < gridSizeState; r++) {
      // let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
      row.push(grid[r][c]);
    }

    // console.log("Left swipe row: ", row);

    row = await slide(row, gridSizeState);

    // Transposing again to return it to it's original form.
    for (let r = 0; r < gridSizeState; r++) {
      grid[r][c] = row[r];
    }
  }

  return grid;
};

// Doing reverse of rows first before passing them to slide and again reversing them after slide, other than this same as the slideLeft().
const swipeRight = async (grid: gridType, gridSizeState: number) => {
  for (let c = 0; c < gridSizeState; c++) {
    let row: number[] = [];
    for (let r = 0; r < gridSizeState; r++) {
      row.push(grid[r][c]);
    }

    row.reverse();
    row = await slide(row, gridSizeState);
    row.reverse();

    for (let r = 0; r < gridSizeState; r++) {
      grid[r][c] = row[r];
    }
  }

  return grid;
};

export { score, setScoreToZero, swipeLeft, swipeDown, swipeRight, swipeUp };

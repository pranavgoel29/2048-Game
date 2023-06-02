import { gridSize } from "./Board";

const filterZero = async (row) => {
  return row.filter((num) => num != 0);
};

// - Swipes/moves - screenLeft, right, up, down
const slide = async (row) => {
  row = await filterZero(row);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }

  row = await filterZero(row);

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

export { swipeLeft, swipeDown, swipeRight, swipeUp };

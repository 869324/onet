import { colors } from "./constants";

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * max + min);
}

export function generateMatrix() {
  const matrix = [];
  for (let i = 0; i < 8; i++) {
    const row = [];

    for (let j = 0; j < 10; j++) {
      const color = getRandomNum(0, colors.length);
      const cell = {
        color,
        row: i,
        column: j,
      };
      row.push(cell);
    }

    matrix.push(row);
  }

  return matrix;
}

export function checkStraightRoute(matrix, removedCells, cell1, cell2) {
  let isValid = false;

  const sameRow = cell1.row === cell2.row;
  const sameColumn = cell1.column === cell2.column;
  if (sameRow) {
    const rowId = cell1.row;

    let blockingCells = matrix[rowId]
      .filter((cell) => {
        const columnId = cell.column;
        return (
          (columnId > cell1.column && columnId < cell2.column) ||
          (columnId > cell2.column && columnId < cell1.column)
        );
      })
      .filter((cell) => {
        return !removedCells.find(
          (c) => c.row == cell.row && c.column === cell.column
        );
      });

    if (!blockingCells.length) {
      isValid = true;
    }
  } else if (sameColumn) {
    const columnId = cell1.column;

    let blockingCells = matrix
      .map((row) => row[columnId])
      .filter((cell) => {
        const rowId = cell.row;
        return (
          (rowId > cell1.row && rowId < cell2.row) ||
          (rowId > cell2.row && rowId < cell1.row)
        );
      })
      .filter((cell) => {
        return !removedCells.find(
          (c) => c.row === cell.row && c.column === cell.column
        );
      });

    if (!blockingCells.length) {
      isValid = true;
    }
  }
  return isValid;
}

import { colors, DIRECTION } from "./constants";

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

export function checkRoutes(matrix, removedCells, cell1, cell2) {
  const routes = [
    {
      turns: 0,
      moves: [cell1],
      direction: null,
    },
  ];

  return findRoutes(matrix, removedCells, routes, cell2);
}

function findRoutes(matrix, removedCells, routes, target) {
  let isValid = false;

  for (let id = 0; id < routes.length; id++) {
    const route = routes[id];
    const newRoutes = routes;
    newRoutes.splice(id, 1);

    const possibleMoves = findPossibleMoves(
      matrix,
      removedCells,
      route,
      target
    );
    console.log({ possibleMoves, target });
    let found = false;
    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];
      if (move.row == target.row && move.column == target.column) {
        found = true;
        break;
      } else {
        newRoutes.push({
          turns: move.turns,
          moves: [...route.moves, { row: move.row, column: move.column }],
          direction: move.direction,
        });
      }
    }
    if (found) {
      isValid = true;
      break;
    } else {
      console.log({ newRoutes });
      isValid = findRoutes(matrix, removedCells, newRoutes, target);
    }
  }

  return isValid;
}

function findPossibleMoves(matrix, removedCells, route, target) {
  const { moves, turns, direction } = route;
  const lastCell = moves[moves.length - 1];
  let newMoves = [];

  // if (cell.row == 0) {
  //   if (direction == null || direction === DIRECTION.VERTICAL) {
  //     newMoves.push({
  //       row: -1,
  //       column: cell.column,
  //       turns,
  //       direction: DIRECTION.VERTICAL,
  //     });
  //   } else {
  //     if (turns < 2) {
  //       newMoves.push({
  //         row: -1,
  //         column: cell.column,
  //         turns: turns + 1,
  //         direction: DIRECTION.VERTICAL,
  //       });
  //     }
  //   }
  // } else if (cell.row == 7) {
  //   if (direction == null || direction === DIRECTION.VERTICAL) {
  //     newMoves.push({
  //       row: 8,
  //       column: cell.column,
  //       turns,
  //       direction: DIRECTION.VERTICAL,
  //     });
  //   } else {
  //     if (turns < 2) {
  //       newMoves.push({
  //         row: 8,
  //         column: cell.column,
  //         turns: turns + 1,
  //         direction: DIRECTION.VERTICAL,
  //       });
  //     }
  //   }
  // }

  // if (cell.column == 0) {
  //   if (direction == null || direction === DIRECTION.HORIZONTAL) {
  //     newMoves.push({
  //       row: cell.row,
  //       column: -1,
  //       turns,
  //       direction: DIRECTION.HORIZONTAL,
  //     });
  //   } else {
  //     if (turns < 2) {
  //       newMoves.push({
  //         row: cell.row,
  //         column: -1,
  //         turns: turns + 1,
  //         direction: DIRECTION.HORIZONTAL,
  //       });
  //     }
  //   }
  // } else if (cell.column == 9) {
  //   if (direction == null || direction === DIRECTION.HORIZONTAL) {
  //     newMoves.push({
  //       row: cell.row,
  //       column: 10,
  //       turns,
  //       direction: DIRECTION.HORIZONTAL,
  //     });
  //   } else {
  //     newMoves.push({
  //       row: cell.row,
  //       column: 10,
  //       turns: turns + 1,
  //       direction: DIRECTION.HORIZONTAL,
  //     });
  //   }
  // }

  let adjacentMoves = [];
  let adjacentCells = [];
  matrix.forEach((row) => {
    row.forEach((c) => {
      if (
        (Math.abs(c.row - lastCell.row) == 1 &&
          c.column - lastCell.column == 0) ||
        (Math.abs(c.column - lastCell.column) == 1 && c.row - lastCell.row == 0)
      ) {
        adjacentCells.push(c);
      }
    });
  });

  console.log({ adjacentCells });

  adjacentCells.forEach((cell) => {
    const isTarget = cell.row == target.row && cell.column == target.column;
    const isRemoved =
      removedCells.findIndex(
        (c) => c.row == cell.row && c.column == cell.column
      ) > -1;
    const isVisited =
      moves.findIndex((c) => c.row == cell.row && c.column == cell.column) > -1;

    if (!isVisited) {
      if (isTarget || isRemoved) {
        const isVertical =
          Math.abs(lastCell.row - cell.row) == 1 &&
          lastCell.column - cell.column == 0;
        const isHorizontal =
          Math.abs(lastCell.column - cell.column) == 1 &&
          lastCell.row - cell.row == 0;

        if (isVertical) {
          if (direction == null || direction === DIRECTION.VERTICAL) {
            adjacentMoves.push({
              row: cell.row,
              column: cell.column,
              turns,
              direction: DIRECTION.VERTICAL,
            });
          } else {
            if (turns < 2) {
              adjacentMoves.push({
                row: cell.row,
                column: cell.column,
                turns: turns + 1,
                direction: DIRECTION.VERTICAL,
              });
            }
          }
        } else if (isHorizontal) {
          if (direction == null || direction === DIRECTION.HORIZONTAL) {
            adjacentMoves.push({
              row: cell.row,
              column: cell.column,
              turns,
              direction: DIRECTION.HORIZONTAL,
            });
          } else {
            if (turns < 2) {
              adjacentMoves.push({
                row: cell.row,
                column: cell.column,
                turns: turns + 1,
                direction: DIRECTION.HORIZONTAL,
              });
            }
          }
        }
      }
    }
  });

  console.log({ adjacentMoves });
  newMoves = [...newMoves, ...adjacentMoves];

  return newMoves;
}

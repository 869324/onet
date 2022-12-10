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
      };
      row.push(cell);
    }

    matrix.push(row);
  }

  return matrix;
}

import { GRID_OBJECTS } from "../../constants/Constants";
import BaseGridGenerator from "./BaseGridGenerator";

/*
Recursive Divsion
1. Fill grid borders with walls
2. Bisect the grid and draw wall (when choosing bisect point ensure
  you don't block any previous gaps)
3. Choose random point in wall for a gap
4. Repeat with bisected grids until grids are too small
*/
class RecursiveDivision extends BaseGridGenerator {
  constructor(grid) {
    super(grid);
    this.init();
  }

  init = () => {
    this.generate(1, this.gridWidth - 1, 1, this.gridHeight - 1, true);
  };

  generate = (xStart, xEnd, yStart, yEnd, horizontal) => {
    if (horizontal) {
      this.horizontalDivision(xStart, xEnd, yStart, yEnd, horizontal);
    } else {
      this.verticalDivision(xStart, xEnd, yStart, yEnd, horizontal);
    }
  };

  //divide across vertical axis
  verticalDivision = (xStart, xEnd, yStart, yEnd, horizontal) => {
    if (xEnd - xStart < 2) return;
    const columns = this.getPossibleColumns(xStart, xEnd, yStart, yEnd);
    if (columns.length === 0) return;
    const divPoint =
      columns[this.getRandomNumberInRange(0, columns.length - 1)];
    const gap = this.getRandomNumberInRange(yStart, yEnd);
    for (let i = yStart; i <= yEnd; i++) {
      if (this.grid[i][divPoint] !== GRID_OBJECTS.EMPTY || gap === i) continue;
      this.grid[i][divPoint] = GRID_OBJECTS.WALL;
      this.logSteps(divPoint, i, GRID_OBJECTS.WALL);
    }
    this.generate(xStart, divPoint - 1, yStart, yEnd, !horizontal); //left grid
    this.generate(divPoint + 1, xEnd, yStart, yEnd, !horizontal); //right grid
  };

  //divide across horizontal axis
  horizontalDivision = (xStart, xEnd, yStart, yEnd, horizontal) => {
    if (yEnd - yStart < 2) return;
    const rows = this.getPossibleRows(xStart, xEnd, yStart, yEnd);
    if (rows.length === 0) return;
    const divPoint = rows[this.getRandomNumberInRange(0, rows.length - 1)];
    const gap = this.getRandomNumberInRange(xStart, xEnd);
    for (let i = xStart; i <= xEnd; i++) {
      if (this.grid[divPoint][i] !== GRID_OBJECTS.EMPTY || gap === i) continue;
      this.grid[divPoint][i] = GRID_OBJECTS.WALL;
      this.logSteps(i, divPoint, GRID_OBJECTS.WALL);
    }
    this.generate(xStart, xEnd, yStart, divPoint - 1, !horizontal); //top grid
    this.generate(xStart, xEnd, divPoint + 1, yEnd, !horizontal); //bottom grid
  };

  getPossibleColumns = (xStart, xEnd, yStart, yEnd) => {
    const columns = [];
    for (let i = xStart + 1; i <= xEnd - 1; i++) {
      if (
        this.grid[yStart - 1][i] === GRID_OBJECTS.WALL &&
        this.grid[yEnd + 1][i] === GRID_OBJECTS.WALL
      ) {
        columns.push(i);
      }
    }
    return columns;
  };

  getPossibleRows = (xStart, xEnd, yStart, yEnd) => {
    const rows = [];
    for (let i = yStart + 1; i <= yEnd - 1; i++) {
      if (
        this.grid[i][xStart - 1] === GRID_OBJECTS.WALL &&
        this.grid[i][xEnd + 1] === GRID_OBJECTS.WALL
      ) {
        rows.push(i);
      }
    }
    return rows;
  };
}

export default RecursiveDivision;

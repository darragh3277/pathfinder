import BaseGridGenerator from "./BaseGridGenerator";
import { GRID_OBJECTS } from "../../constants/Constants";
import { getRandomNumberInRange } from "../../utils/Helpers";

/*
Recursive Divsion
1. Fill grid borders with walls
2. Bisect the grid horizontally and draw wall (when choosing bisect point ensure
  you don't block any previous gaps)
3. Choose random point in wall for a gap
4. Repeat with bisected grids until grids are too small
*/
class RecursiveDivision extends BaseGridGenerator {
  constructor(grid) {
    super(grid);
    this.addBorders();
    this.init();
  }

  init = () => {
    this.generate(1, this.gridWidth - 1, 1, this.gridHeight - 1);
  };

  generate = (xStart, xEnd, yStart, yEnd) => {
    if (yEnd - yStart < 2) return;
    const rows = this.getPossibleRows(xStart, xEnd, yStart, yEnd);
    if (rows.length === 0) return;
    const divPoint = rows[getRandomNumberInRange(0, rows.length - 1)];
    const gap = getRandomNumberInRange(xStart, xEnd);
    for (let i = xStart; i <= xEnd; i++) {
      if (this.grid[divPoint][i].objectType !== GRID_OBJECTS.EMPTY || gap === i)
        continue;
      this.grid[divPoint][i].objectType = GRID_OBJECTS.WALL;
      this.logSteps(i, divPoint, GRID_OBJECTS.WALL);
    }
    this.generate(xStart, xEnd, yStart, divPoint - 1); //top grid
    this.generate(xStart, xEnd, divPoint + 1, yEnd); //bottom grid
  };

  getPossibleRows = (xStart, xEnd, yStart, yEnd) => {
    const rows = [];
    for (let i = yStart + 1; i <= yEnd - 1; i++) {
      if (
        this.grid[i][xStart - 1].objectType === GRID_OBJECTS.WALL &&
        this.grid[i][xEnd + 1].objectType === GRID_OBJECTS.WALL
      ) {
        rows.push(i);
      }
    }
    return rows;
  };
}

export default RecursiveDivision;

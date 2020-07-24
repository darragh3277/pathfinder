import BaseGridGenerator from "./BaseGridGenerator";
import { GRID_OBJECTS } from "../../constants/Constants";
import { getRandomNumberInRange } from "../../utils/Helpers";

/*
Recursive Divsion
1. Fill grid borders with walls
2. Bisect the grid vertically and draw wall (when choosing bisect point ensure
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
    if (xEnd - xStart < 2) return;
    const columns = this.getPossibleColumns(xStart, xEnd, yStart, yEnd);
    if (columns.length === 0) return;
    const divPoint = columns[getRandomNumberInRange(0, columns.length - 1)];
    const gap = getRandomNumberInRange(yStart, yEnd);
    for (let i = yStart; i <= yEnd; i++) {
      if (this.grid[i][divPoint] !== GRID_OBJECTS.EMPTY || gap === i) continue;
      this.grid[i][divPoint] = GRID_OBJECTS.WALL;
      this.logSteps(divPoint, i, GRID_OBJECTS.WALL);
    }
    this.generate(xStart, divPoint - 1, yStart, yEnd); //left grid
    this.generate(divPoint + 1, xEnd, yStart, yEnd); //right grid
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
}

export default RecursiveDivision;

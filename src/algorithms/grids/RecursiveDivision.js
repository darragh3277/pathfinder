import { GRID_OBJECTS } from "../../constants/Constants";

class RecursiveDivision {
  constructor(grid) {
    this.grid = JSON.parse(JSON.stringify(grid));
    this.steps = [];
  }
  generate = () => {
    const height = this.grid.length - 1;
    const width = this.grid[0].length - 1;
    this.division(0, width, 0, height, true);
    return this.grid;
  };

  logSteps = (col, row, object) => {
    this.steps.push({ col: col, row: row, object: object });
  };

  getSteps = () => {
    return this.steps;
  };

  division = (xStart, xEnd, yStart, yEnd, horizontal) => {
    if (xEnd - xStart <= 2 || yEnd - yStart <= 2) return;
    if (horizontal) {
      const midPoint = Math.floor((xEnd - xStart) / 2) + xStart;
      const gap = Math.floor(Math.random() * yEnd) + yStart;
      for (let i = yStart; i <= yEnd; i++) {
        if (this.grid[i][midPoint] !== GRID_OBJECTS.EMPTY || i === gap)
          continue;
        this.grid[i][midPoint] = GRID_OBJECTS.WALL;
        this.logSteps(midPoint, i, GRID_OBJECTS.WALL);
      }
      this.division(xStart, midPoint, yStart, yEnd, !horizontal); //left grid
      this.division(midPoint + 1, xEnd, yStart, yEnd, !horizontal); //right grid
    } else {
      const midPoint = Math.floor((yEnd - yStart) / 2) + yStart;
      const gap = Math.floor(Math.random() * xEnd) + xStart;
      const row = this.grid[midPoint];
      for (let i = xStart; i <= xEnd; i++) {
        if (row[i] !== GRID_OBJECTS.EMPTY || i === gap) continue;
        row[i] = GRID_OBJECTS.WALL;
        this.logSteps(i, midPoint, GRID_OBJECTS.WALL);
      }
      this.grid[midPoint] = row;
      this.division(xStart, xEnd, yStart, midPoint, !horizontal); //top grid
      this.division(xStart, xEnd, midPoint + 1, yEnd, !horizontal); //bottom grid
    }
  };
}

export default RecursiveDivision;

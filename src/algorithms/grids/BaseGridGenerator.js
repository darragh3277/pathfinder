import { GRID_OBJECTS } from "../../constants/Constants";

class BaseGridGenerator {
  constructor(grid) {
    this.grid = JSON.parse(JSON.stringify(grid));
    this.steps = [];
  }

  init = () => {
    const height = this.grid.length - 1;
    const width = this.grid[0].length - 1;
    this.addBorders(width, height);
    this.generate(1, width - 1, 1, height - 1, true);
  };

  getSteps = () => {
    return this.steps;
  };

  getGrid = () => {
    return this.grid;
  };

  logSteps = (col, row, object) => {
    this.steps.push({ col: col, row: row, object: object });
  };

  addBorders = (width, height) => {
    for (let i = 0; i <= width; i++) {
      this.logSteps(i, 0, GRID_OBJECTS.WALL);
      this.logSteps(width - i, height, GRID_OBJECTS.WALL);
      this.grid[0][i] = GRID_OBJECTS.WALL;
      this.grid[height][i] = GRID_OBJECTS.WALL;
    }

    for (let i = 0; i <= height; i++) {
      this.logSteps(0, height - i, GRID_OBJECTS.WALL);
      this.logSteps(width, i, GRID_OBJECTS.WALL);
      this.grid[i][0] = GRID_OBJECTS.WALL;
      this.grid[i][width] = GRID_OBJECTS.WALL;
    }
  };

  getRandomNumberInRange = (start, end) => {
    return Math.floor(Math.random() * (end - start) + start);
  };
}

export default BaseGridGenerator;

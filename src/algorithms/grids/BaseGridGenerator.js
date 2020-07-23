import { GRID_OBJECTS } from "../../constants/Constants";

class BaseGridGenerator {
  constructor(grid) {
    this.grid = JSON.parse(JSON.stringify(grid));
    this.steps = [];
    this.gridHeight = this.grid.length - 1;
    this.gridWidth = this.grid[0].length - 1;
    this.addBorders();
  }

  getSteps = () => {
    return this.steps;
  };

  getGrid = () => {
    return this.grid;
  };

  //record each step for animation
  logSteps = (col, row, object) => {
    this.steps.push({ col: col, row: row, object: object });
  };

  //populate borders of grid
  addBorders = () => {
    for (let i = 0; i <= this.gridWidth; i++) {
      this.logSteps(i, 0, GRID_OBJECTS.WALL);
      this.logSteps(this.gridWidth - i, this.gridHeight, GRID_OBJECTS.WALL);
      this.grid[0][i] = GRID_OBJECTS.WALL;
      this.grid[this.gridHeight][i] = GRID_OBJECTS.WALL;
    }

    for (let i = 0; i <= this.gridHeight; i++) {
      this.logSteps(0, this.gridHeight - i, GRID_OBJECTS.WALL);
      this.logSteps(this.gridWidth, i, GRID_OBJECTS.WALL);
      this.grid[i][0] = GRID_OBJECTS.WALL;
      this.grid[i][this.gridWidth] = GRID_OBJECTS.WALL;
    }
  };

  getRandomNumberInRange = (start, end) => {
    return Math.floor(Math.random() * (end - start) + start);
  };
}

export default BaseGridGenerator;

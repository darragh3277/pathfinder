import { GRID_OBJECTS } from "../../constants/Constants";
import { deepCopyObject } from "../../utils/Helpers";

class BaseGridGenerator {
  constructor(grid) {
    this.type = GRID_OBJECTS.WALL;
    this.steps = [];
    if (grid) this.init(grid);
  }

  init = (grid) => {
    this.grid = deepCopyObject(grid);
    this.gridHeight = this.grid.length - 1;
    this.gridWidth = this.grid[0].length - 1;
  };

  getType = () => {
    return this.type;
  };

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
      this.grid[0][i].objectType = GRID_OBJECTS.WALL;
      this.grid[this.gridHeight][i].objectType = GRID_OBJECTS.WALL;
    }

    for (let i = 0; i <= this.gridHeight; i++) {
      this.logSteps(0, this.gridHeight - i, GRID_OBJECTS.WALL);
      this.logSteps(this.gridWidth, i, GRID_OBJECTS.WALL);
      this.grid[i][0].objectType = GRID_OBJECTS.WALL;
      this.grid[i][this.gridWidth].objectType = GRID_OBJECTS.WALL;
    }
  };
}

export default BaseGridGenerator;

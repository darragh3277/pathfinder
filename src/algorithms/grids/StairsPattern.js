import BaseGridGenerator from "./BaseGridGenerator";
import { GRID_OBJECTS } from "../../constants/Constants";
import { getObjectCoords } from "../../utils/Helpers";

/*
Stairs pattern
Start in bottom left corner
Moving diagonally up and right fill all squares with wall
Once you reach the top start moving down and right
Once wall has crossed x axis of start point do not fill to edges
in order to provide a path to end point
*/
class StairsPattern extends BaseGridGenerator {
  constructor(grid) {
    super(grid);
    this.startCoords = getObjectCoords(grid, GRID_OBJECTS.START);
    this.generate(0, this.gridHeight, true);
  }

  generate = (col, row, up) => {
    //leave gap at the end
    if (this.grid[0][col + 1] === undefined) return;
    //don't overwrite start or end
    if (this.grid[row][col] === GRID_OBJECTS.EMPTY) {
      this.logSteps(col, row, GRID_OBJECTS.WALL);
      this.grid[row][col] = GRID_OBJECTS.WALL;
    }
    const passedStart = col > this.startCoords.col;
    if (up === true) {
      //currently going up
      //can we continue in this direction
      if (passedStart) {
        up = row - 1 !== 0;
      } else {
        up = this.grid[row - 1] !== undefined;
      }
    } else {
      //currently going down
      //can we continue in this direction
      if (passedStart) {
        up = row + 1 === this.gridHeight;
      } else {
        up = this.grid[row + 1] === undefined;
      }
    }
    if (up) {
      this.generate(col + 1, row - 1, true);
    } else {
      this.generate(col + 1, row + 1, false);
    }
  };
}

export default StairsPattern;

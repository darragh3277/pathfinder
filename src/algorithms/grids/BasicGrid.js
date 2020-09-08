import BaseGridGenerator from "./BaseGridGenerator";
import { GRID_OBJECTS } from "../../constants/Constants";

/*
Basic Grid
Foreach node, determine if it's a wall or empty by comparing
to a randomly generated number. The frequency is determined
by adjusting the freq variable
*/
class BasicGrid extends BaseGridGenerator {
  constructor(grid, type) {
    super(grid);
    this.type = type;
    this.frequency = type === GRID_OBJECTS.WALL ? 0.25 : 0.33;
    this.generate();
  }

  generate = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const node = this.grid[i][j];
        if (node.objectType !== GRID_OBJECTS.EMPTY) continue;
        if (this.frequency >= Math.random()) {
          node.objectType = this.type;
          this.logSteps(node.col, node.row, this.type);
        }
      }
    }
  };
}

export default BasicGrid;

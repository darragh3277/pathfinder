import BaseGridGenerator from "./BaseGridGenerator";
import { GRID_OBJECTS } from "../../constants/Constants";

class EmptyGrid extends BaseGridGenerator {
  constructor(width, height, nodeDimension) {
    super();
    this.width = width;
    this.height = height;
    this.nodeDimension = nodeDimension;
    return this.generate();
  }

  generate = () => {
    const grid = [];
    const numRows = Math.floor(this.height / this.nodeDimension);
    const numCols = Math.floor(this.width / this.nodeDimension);
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(this.createNode(j, i, GRID_OBJECTS.EMPTY));
      }
      grid.push(row);
    }
    this.updateGridStartAndEndPoints(grid, numCols, numRows);
    return grid;
  };

  updateGridStartAndEndPoints = (grid, numCols, numRows) => {
    const rowMidpoint = Math.floor(numRows / 2);
    const colStartpint = Math.floor(numCols * 0.25);
    const colEndpoint = Math.floor(numCols * 0.75);
    grid[rowMidpoint][colStartpint].objectType = GRID_OBJECTS.START;
    grid[rowMidpoint][colEndpoint].objectType = GRID_OBJECTS.END;
  };

  createNode = (col, row, objectType) => {
    return {
      col,
      row,
      distance: Infinity,
      heuristic: Infinity,
      visited: false,
      objectType,
      prevNode: null,
      secondaryPath: false,
    };
  };
}

export default EmptyGrid;

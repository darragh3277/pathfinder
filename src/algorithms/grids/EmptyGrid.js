import { GRID_OBJECTS } from "../../constants/Constants";

class EmptyGrid {
  constructor(width, height, nodeDimension) {
    this.width = width;
    this.height = height;
    this.nodeDimension = nodeDimension;
    return this.generate();
  }

  generate = () => {
    const grid = [];
    const numRows = Math.floor(this.height / this.nodeDimension);
    const numCols = Math.floor(this.width / this.nodeDimension);
    let row = [];
    for (let i = 0; i < numCols; i++) {
      row.push(GRID_OBJECTS.EMPTY);
    }
    for (let i = 0; i < numRows; i++) {
      grid.push([...row]);
    }
    //set default start and end points
    const verticalMidPoint = Math.floor(grid.length / 2);
    grid[verticalMidPoint][Math.floor(row.length * 0.25)] = GRID_OBJECTS.START;
    grid[verticalMidPoint][Math.floor(row.length * 0.75)] = GRID_OBJECTS.END;
    return grid;
  };
}

export default EmptyGrid;

import { GRID_OBJECTS } from "../../constants/Constants";

class BasePathfinder {
  constructor(grid) {
    this.grid = grid;
    this.unvistitedNodes = this.getUnvisitedNodes(grid);
  }

  getUnvisitedNodes = grid => {
    const unvistitedNodes = [];
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i];
      for (let j = 0; j < row.length; j++) {
        const objectType = row[j];
        let isStart = false;
        let isEnd = false;
        if (objectType === GRID_OBJECTS.WALL) {
          continue;
        } else if (objectType === GRID_OBJECTS.START) {
          isStart = true;
          console.log(i, j);
        } else if (objectType === GRID_OBJECTS.END) {
          isEnd = true;
          console.log(i, j);
        }
        unvistitedNodes.push(this.createNode(j, i, isStart, isEnd));
      }
    }
    return unvistitedNodes;
  };

  getUnvisitedNeighbours = currentNode => {
    const neighbours = [];
    //check North
    const northNeighbour = this.grid[currentNode.row - 1][currentNode.col];
    if (northNeighbour.isVisited) {
    }
    //check East
    //check South
    //check West
    //check the 4 directions
  };

  sortNodesByDistance = nodes => {
    return nodes.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  };

  createNode = (col, row, isStart, isEnd) => {
    const distance = isStart ? 0 : Infinity;
    return {
      col,
      row,
      distance,
      isStart,
      isEnd,
      isVisited: false
    };
  };
}

export default BasePathfinder;

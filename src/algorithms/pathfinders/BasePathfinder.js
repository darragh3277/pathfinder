import { GRID_OBJECTS } from "../../constants/Constants";
import { deepCopyObject } from "../../utils/Helpers";

class BasePathfinder {
  constructor(grid) {
    this.grid = deepCopyObject(grid);
    this.shortestPath = [];
    this.searchPath = [];
  }

  getShortestPath = () => {
    return this.shortestPath;
  };

  getSearchPath = () => {
    return this.searchPath;
  };

  getUnvisitedNodes = () => {
    const unvistitedNodes = [];
    for (let i = 0; i < this.grid.length; i++) {
      const row = this.grid[i];
      for (let j = 0; j < row.length; j++) {
        const node = row[j];
        if (node.objectType === GRID_OBJECTS.WALL) {
          continue;
        } else if (node.objectType === GRID_OBJECTS.START) {
          node.distance = 0;
          node.heuristic = 0;
        }
        unvistitedNodes.push(node);
      }
    }
    return unvistitedNodes;
  };

  getUnvisitedNeighbours = (currentNode) => {
    const neighbours = [];
    if (currentNode.row - 1 >= 0) {
      const node = this.grid[currentNode.row - 1][currentNode.col];
      if (node.visited === false) neighbours.push(node);
    }
    if (currentNode.col + 1 < this.grid[0].length) {
      const node = this.grid[currentNode.row][currentNode.col + 1];
      if (node.visited === false) neighbours.push(node);
    }
    if (currentNode.row + 1 < this.grid.length) {
      const node = this.grid[currentNode.row + 1][currentNode.col];
      if (node.visited === false) neighbours.push(node);
    }
    if (currentNode.col - 1 >= 0) {
      const node = this.grid[currentNode.row][currentNode.col - 1];
      if (node.visited === false) neighbours.push(node);
    }
    return neighbours;
  };

  sortNodesByKey = (nodes, property) => {
    return nodes.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  };

  extractShortestPath = (node) => {
    const path = [];
    while (node !== null) {
      path.push(node);
      node = node.prevNode;
    }
    return path;
  };
}

export default BasePathfinder;

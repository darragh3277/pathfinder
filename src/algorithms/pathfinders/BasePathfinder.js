import { GRID_OBJECTS } from "../../constants/Constants";
import { deepCopyObject } from "../../utils/Helpers";

class BasePathfinder {
  constructor(grid) {
    this.grid = deepCopyObject(grid);
    this.startCoords = { col: null, row: null };
    this.detourCoords = { col: null, row: null };
    this.endCoords = { col: null, row: null };
    this.setCoords();
    this.shortestPath = [];
    this.searchPath = [];
  }

  setCoords = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const node = this.grid[i][j];
        switch (node.objectType) {
          case GRID_OBJECTS.START:
            this.startCoords = { col: node.col, row: node.row };
            break;
          case GRID_OBJECTS.DETOUR:
            this.detourCoords = { col: node.col, row: node.row };
            break;
          case GRID_OBJECTS.END:
            this.endCoords = { col: node.col, row: node.row };
            break;
          default:
            break;
        }
      }
    }
  };

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
        if (node.objectType === GRID_OBJECTS.WALL) continue;
        unvistitedNodes.push(node);
      }
    }
    return unvistitedNodes;
  };

  getUnvisitedNeighbours = (currentNode) => {
    const neighbours = [];
    if (currentNode.row - 1 >= 0) {
      const node = this.grid[currentNode.row - 1][currentNode.col];
      if (node.visited === false && node.objectType !== GRID_OBJECTS.WALL)
        neighbours.push(node);
    }
    if (currentNode.col + 1 < this.grid[0].length) {
      const node = this.grid[currentNode.row][currentNode.col + 1];
      if (node.visited === false && node.objectType !== GRID_OBJECTS.WALL)
        neighbours.push(node);
    }
    if (currentNode.row + 1 < this.grid.length) {
      const node = this.grid[currentNode.row + 1][currentNode.col];
      if (node.visited === false && node.objectType !== GRID_OBJECTS.WALL)
        neighbours.push(node);
    }
    if (currentNode.col - 1 >= 0) {
      const node = this.grid[currentNode.row][currentNode.col - 1];
      if (node.visited === false && node.objectType !== GRID_OBJECTS.WALL)
        neighbours.push(node);
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

  initStartObject = (object) => {
    this.grid[object.row][object.col].distance = 0;
    this.grid[object.row][object.col].heuristic = 0;
  };

  checkIsDestination = (object, destination) => {
    return object.row === destination.row && object.col === destination.col;
  };

  resetNodes = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const node = this.grid[i][j];
        node.prevNode = null;
        node.distance = Infinity;
        node.heuristic = Infinity;
        node.visited = false;
      }
    }
  };

  addToSearchPath = (node, secondaryPath) => {
    this.searchPath.push({
      col: node.col,
      row: node.row,
      secondaryPath,
    });
  };
}

export default BasePathfinder;

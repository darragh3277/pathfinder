import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS } from "../../constants/Constants";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    let found = false;
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0 && found === false) {
      this.sortNodesByDistance(unvisitedNodes);
      const currentNode = unvisitedNodes.shift();
      this.searchPath.push(currentNode);
      this.grid[currentNode.row][currentNode.col].visited = true;
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbourNode = unvisitedNeighbours[i];
        neighbourNode.prevNode = currentNode;
        this.grid[neighbourNode.row][neighbourNode.col].distance =
          currentNode.distance + 1;
        if (neighbourNode.objectType === GRID_OBJECTS.END) {
          found = true;
          this.shortestPath = this.extractShortestPath(currentNode);
        }
      }
    }
  };
}

export default Dijkstra;

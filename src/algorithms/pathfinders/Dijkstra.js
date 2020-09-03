import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS, WEIGHT_VALUE } from "../../constants/Constants";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    let found = false;
    //get a list of all unvisited nodes
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0 && found === false) {
      //sort unvisited nodes by distance
      this.sortNodesByDistance(unvisitedNodes);
      const currentNode = unvisitedNodes.shift();
      //if the closest node is set to infinity then it's an
      //unreachable node, return
      if (currentNode.distance === Infinity) return;
      //add the current node to the search path stack (excluding the start node)
      //and set visited to true
      if (currentNode.distance > 0) {
        this.searchPath.push(currentNode);
      }
      this.grid[currentNode.row][currentNode.col].visited = true;
      //get all the current nodes neighbours
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //update neighbour nodes distance
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbourNode = unvisitedNeighbours[i];
        neighbourNode.prevNode = currentNode;
        let distance = 1;
        if (neighbourNode.objectType === GRID_OBJECTS.WEIGHT) {
          distance = WEIGHT_VALUE;
        }
        this.grid[neighbourNode.row][neighbourNode.col].distance =
          currentNode.distance + distance;
        //if one of the neighbours is the end node finish and set the
        //shortest path
        if (neighbourNode.objectType === GRID_OBJECTS.END) {
          found = true;
          this.shortestPath = this.extractShortestPath(currentNode);
        }
      }
    }
  };
}

export default Dijkstra;

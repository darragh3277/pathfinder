import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS, WEIGHT_VALUE } from "../../constants/Constants";
import { getObjectCoords, manhattanDistance } from "../../utils/Helpers";

class BFS extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    //get a list of all unvisited nodes
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0) {
      //sort unvisited nodes by distance
      this.sortNodesByKey(unvisitedNodes, "heuristic");
      const currentNode = unvisitedNodes.shift();
      //end if the current node is the end object
      if (currentNode.objectType === GRID_OBJECTS.END) {
        this.shortestPath = this.extractShortestPath(currentNode);
        break;
      }
      //if the closest node is set to infinity then it's an
      //unreachable node, return
      if (currentNode.heuristic === Infinity) return;
      //add the current node to the search path stack
      //and set visited to true
      this.searchPath.push(currentNode);
      currentNode.visited = true;
      //get all the current nodes neighbours
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //update neighbour nodes heruistics
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbourNode = unvisitedNeighbours[i];
        neighbourNode.heuristic = currentNode.heuristic + 1;
        neighbourNode.prevNode = currentNode;
      }
    }
  };
}

export default BFS;

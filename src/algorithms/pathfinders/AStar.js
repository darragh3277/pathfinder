import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS, WEIGHT_VALUE } from "../../constants/Constants";
import { getObjectCoords, manhattanDistance } from "../../utils/Helpers";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    const endCoords = getObjectCoords(this.grid, GRID_OBJECTS.END);
    //get a list of all unvisited nodes
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0) {
      //sort unvisited nodes by distance
      this.sortNodesByKey(unvisitedNodes, "heuristic");
      const currentNode = unvisitedNodes.shift();
      // console.log([...unvisitedNodes]);
      //end if the current node is the end object
      if (currentNode.objectType === GRID_OBJECTS.END) {
        this.shortestPath = this.extractShortestPath(currentNode);
        break;
      }
      //if the closest node is set to infinity then it's an
      //unreachable node, return
      if (currentNode.distance === Infinity) return;
      //add the current node to the search path stack
      //and set visited to true
      this.searchPath.push(currentNode);
      currentNode.visited = true;
      //get all the current nodes neighbours
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //update neighbour nodes distance
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbourNode = unvisitedNeighbours[i];
        const stepCost =
          neighbourNode.objectType === GRID_OBJECTS.WEIGHT ? WEIGHT_VALUE : 1;

        const currentDistance =
          neighbourNode.distance === Infinity
            ? stepCost
            : neighbourNode.distance;

        const newDistance = currentNode.distance + stepCost;

        //if new distance is less than existing one
        //or node is at infinity then update
        if (
          neighbourNode.distance === Infinity ||
          currentDistance > newDistance
        ) {
          neighbourNode.prevNode = currentNode;
          neighbourNode.distance = newDistance;
          const manhattan = manhattanDistance(
            neighbourNode.col,
            neighbourNode.row,
            endCoords.col,
            endCoords.row
          );
          neighbourNode.heuristic = newDistance + manhattan;
        }
      }
    }
  };
}

export default Dijkstra;

import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS, WEIGHT_VALUE } from "../../constants/Constants";
import { getObjectCoords, manhattanDistance } from "../../utils/Helpers";

class GreedyBFS extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.init();
  }

  init = () => {
    if (this.detourCoords.col !== null) {
      const detourPath = this.solve(this.startCoords, this.detourCoords, false);
      this.resetNodes();
      const finishPath = this.solve(this.detourCoords, this.endCoords, true);
      this.shortestPath = finishPath.concat(detourPath);
    } else {
      this.shortestPath = this.solve(this.startCoords, this.endCoords, false);
    }
  };

  solve = (pointA, pointB, secondaryPath) => {
    this.initStartObject(pointA);
    //get a list of all unvisited nodes
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0) {
      //sort unvisited nodes by distance
      this.sortNodesByKey(unvisitedNodes, "heuristic");
      const currentNode = unvisitedNodes.shift();
      //end if the current node is the end object
      if (this.checkIsDestination(currentNode, pointB)) {
        return this.extractShortestPath(currentNode);
      }
      //if the closest node is set to infinity then it's an
      //unreachable node, return
      if (currentNode.heuristic === Infinity) return;
      //add the current node to the search path stack
      //and set visited to true
      this.addToSearchPath(currentNode, secondaryPath);
      currentNode.visited = true;
      //get all the current nodes neighbours
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //update neighbour nodes heruistics
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbourNode = unvisitedNeighbours[i];
        const stepCost =
          neighbourNode.objectType === GRID_OBJECTS.WEIGHT ? WEIGHT_VALUE : 1;
        const manhattan = manhattanDistance(
          neighbourNode.col,
          neighbourNode.row,
          pointB.col,
          pointB.row
        );
        const newHeuristic = stepCost + manhattan;
        if (
          neighbourNode.heuristic === Infinity ||
          neighbourNode.heuristic > newHeuristic
        ) {
          neighbourNode.prevNode = currentNode;
          neighbourNode.heuristic = newHeuristic;
        }
      }
    }
  };
}

export default GreedyBFS;

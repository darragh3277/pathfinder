import BasePathfinder from "./BasePathfinder";

class DFS extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.init();
  }

  init = () => {
    if (this.detourCoords.col !== null) {
      const detourPath = this.solve(this.startCoords, this.detourCoords, false);
      if (detourPath.length > 0) {
        this.resetNodes();
        const finishPath = this.solve(this.detourCoords, this.endCoords, true);
        this.shortestPath = finishPath.concat(detourPath);
      }
    } else {
      this.shortestPath = this.solve(this.startCoords, this.endCoords, false);
    }
  };

  solve = (pointA, pointB, secondaryPath) => {
    this.initStartObject(pointA);
    //get a list of all unvisited nodes
    let backtrackNode = null;
    const unvisitedNodes = this.getUnvisitedNodes();
    while (unvisitedNodes.length > 0) {
      //sort unvisited nodes by distance
      this.sortNodesByKey(unvisitedNodes, "heuristic");
      let currentNode = backtrackNode;
      if (currentNode === null) {
        currentNode = unvisitedNodes.shift();
      }
      //if the closest node is set to infinity then it's an
      //unreachable node, return
      if (currentNode.heuristic === Infinity) return [];
      //end if the current node is the end object
      if (this.checkIsDestination(currentNode, pointB)) {
        return this.extractShortestPath(currentNode);
      }
      //add the current node to the search path stack
      //and set visited to true
      this.addToSearchPath(currentNode, secondaryPath);
      currentNode.visited = true;
      //get all the current nodes neighbours
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //update neighbour nodes heruistics
      if (unvisitedNeighbours.length > 0) {
        const neighbourNode = unvisitedNeighbours[0];
        neighbourNode.heuristic = currentNode.heuristic + 1;
        neighbourNode.prevNode = currentNode;
        backtrackNode = null;
      } else {
        backtrackNode = currentNode.prevNode;
      }
    }
    return [];
  };
}

export default DFS;

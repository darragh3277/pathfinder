import BasePathfinder from "./BasePathfinder";

class BFS extends BasePathfinder {
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
        neighbourNode.heuristic = currentNode.heuristic + 1;
        neighbourNode.prevNode = currentNode;
      }
    }
  };
}

export default BFS;

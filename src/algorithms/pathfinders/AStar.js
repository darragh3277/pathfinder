import BasePathfinder from "./BasePathfinder";
import { GRID_OBJECTS, WEIGHT_VALUE } from "../../constants/Constants";
import { getObjectCoords, manhattanDistance } from "../../utils/Helpers";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    let found = false;
    const endCoords = getObjectCoords(this.grid, GRID_OBJECTS.END);
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
        //if neighbours node has had it's distance set already
        //then continue
        if (neighbourNode.distance !== Infinity) continue;
        neighbourNode.prevNode = currentNode;
        let distance = 1;
        if (neighbourNode.objectType === GRID_OBJECTS.WEIGHT) {
          distance = WEIGHT_VALUE;
        }
        //add the manhattan distance for astar search
        const manhattan = manhattanDistance(
          neighbourNode.col,
          neighbourNode.row,
          endCoords.col,
          endCoords.row
        );
        this.grid[neighbourNode.row][neighbourNode.col].distance =
          currentNode.distance + distance + manhattan;
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

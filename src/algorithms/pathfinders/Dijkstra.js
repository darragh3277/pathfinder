import BasePathfinder from "./BasePathfinder";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    const unvisitedNodes = this.sortNodesByDistance(this.unvistitedNodes);
    while (unvisitedNodes.length > 0) {
      const currentNode = unvisitedNodes.shift();
      currentNode.visited = true;
      const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
      //check if unvisited neighbours contain end, update distances
    }
    console.log();
    console.log("solving");
  };
}

export default Dijkstra;

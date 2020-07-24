import BasePathfinder from "./BasePathfinder";

class Dijkstra extends BasePathfinder {
  constructor(grid) {
    super(grid);
    this.solve();
  }

  solve = () => {
    console.log("solving");
  };
}

export default Dijkstra;

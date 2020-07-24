export const GRID_OBJECTS = {
  EMPTY: 0,
  START: 1,
  END: 2,
  WALL: 3,
  DETOUR: 4,
  WEIGHT: 5,
  VISITED: 6,
  PATH: 7,
};

export const algorithms = [
  { id: 1, name: "Dijkstra" },
  { id: 2, name: "A*" },
  { id: 3, name: "Greedy Best-first Search" },
  { id: 4, name: "Swarm Algorithm" },
  { id: 5, name: "Convergent Swarm Algorithm" },
  { id: 6, name: "Bidirectional Swarm Algorithm" },
  { id: 7, name: "Breadth-first Search" },
  { id: 8, name: "Depth-first Search" },
];

export const grids = [
  { id: 1, name: "Empty" },
  { id: 2, name: "Recursive Division" },
  { id: 3, name: "Vertical Recursive Division" },
  { id: 4, name: "Horizontal Recursive Division" },
  { id: 5, name: "Basic Random Maze" },
  { id: 6, name: "Basic Weight Maze" },
  { id: 7, name: "Simple Stair Pattern" },
];

export const speeds = [
  { id: 1, name: "Fast", speed: 10 },
  { id: 2, name: "Medium", speed: 100 },
  { id: 3, name: "Slow", speed: 500 },
];

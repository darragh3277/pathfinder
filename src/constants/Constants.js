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

export const WEIGHT_VALUE = 10;

export const ALGORITHMS = [
  { id: 1, name: "Dijkstra" },
  { id: 2, name: "A*" },
  { id: 3, name: "Greedy Best-first Search" },
  { id: 4, name: "Breadth-first Search" },
  { id: 5, name: "Depth-first Search" },
];

export const GRID_TYPES = [
  { id: 1, name: "Empty" },
  { id: 2, name: "Recursive Division" },
  { id: 3, name: "Vertical Recursive Division" },
  { id: 4, name: "Horizontal Recursive Division" },
  { id: 5, name: "Basic Random Maze" },
  { id: 6, name: "Basic Weight Maze" },
  { id: 7, name: "Simple Stair Pattern" },
];

export const OPTIONAL_OBJECTS = [
  { id: 1, name: "Wall" },
  { id: 2, name: "Weight" },
  { id: 3, name: "Detour" },
];

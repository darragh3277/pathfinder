export function deepCopyObject(object) {
  return object.map((obj) => {
    return obj.map((val) => {
      return val;
    });
  });
}

export function getRandomNumberInRange(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

export function getObjectCoords(grid, object) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];
      if (node.objectType === object) {
        return { col: node.col, row: node.row };
      }
    }
  }
}

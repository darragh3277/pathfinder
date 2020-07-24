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
    const col = grid[i].indexOf(object);
    if (col !== -1) {
      return { col: col, row: i };
    }
  }
}

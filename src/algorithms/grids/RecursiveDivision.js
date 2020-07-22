import { GRID_OBJECTS } from "../../constants/Constants";
/*
Recursive Divsion
1. Fill grid borders with walls
2. Bisect the grid and draw wall (when choosing bisect point ensure
  you don't block any previous gaps)
3. Choose random point in wall for a gap
4. Repeat with bisected grids until grids are too small
*/
class RecursiveDivision {
  constructor(grid) {
    this.grid = JSON.parse(JSON.stringify(grid));
    this.steps = [];
  }
  generate = () => {
    const height = this.grid.length - 1;
    const width = this.grid[0].length - 1;
    console.log(width, height);
    this.addBorders(width, height);
    this.division(1, width - 1, 1, height - 1, true, null);
    return this.grid;
  };

  addBorders = (width, height) => {
    for (let i = 0; i <= width; i++) {
      this.logSteps(i, 0, GRID_OBJECTS.WALL);
      this.logSteps(width - i, height, GRID_OBJECTS.WALL);
    }

    for (let i = 0; i <= height; i++) {
      this.logSteps(0, height - i, GRID_OBJECTS.WALL);
      this.logSteps(width, i, GRID_OBJECTS.WALL);
    }
  };

  logSteps = (col, row, object) => {
    this.steps.push({ col: col, row: row, object: object });
  };

  getSteps = () => {
    return this.steps;
  };

  division = (xStart, xEnd, yStart, yEnd, horizontal, prevGap) => {
    if (horizontal) {
      if (xEnd - xStart < 2) return;
      const divPoint = this.getRandomNumberInRange(
        xStart + 1,
        xEnd - 1,
        prevGap
      );
      const gap = this.getRandomNumberInRange(yStart, yEnd);
      for (let i = yStart; i <= yEnd; i++) {
        if (this.grid[i][divPoint] !== GRID_OBJECTS.EMPTY || i === gap)
          continue;
        this.grid[i][divPoint] = GRID_OBJECTS.WALL;
        this.logSteps(divPoint, i, GRID_OBJECTS.WALL);
      }
      this.division(xStart, divPoint - 1, yStart, yEnd, !horizontal, gap); //left grid
      this.division(divPoint + 1, xEnd, yStart, yEnd, !horizontal, gap); //right grid
    } else {
      if (yEnd - yStart < 2) return;
      const divPoint = this.getRandomNumberInRange(
        yStart + 1,
        yEnd - 1,
        prevGap
      );
      const gap = this.getRandomNumberInRange(xStart, xEnd);
      for (let i = xStart; i <= xEnd; i++) {
        if (this.grid[divPoint][i] !== GRID_OBJECTS.EMPTY || i === gap)
          continue;
        this.grid[divPoint][i] = GRID_OBJECTS.WALL;
        this.logSteps(i, divPoint, GRID_OBJECTS.WALL);
      }
      this.division(xStart, xEnd, yStart, divPoint - 1, !horizontal, gap); //top grid
      this.division(xStart, xEnd, divPoint + 1, yEnd, !horizontal, gap); //bottom grid
    }
  };

  getRandomNumberInRange = (start, end, exclude) => {
    if (exclude === start) return end;
    if (exclude === end) return start;
    let point = Math.floor(Math.random() * (end - start) + start);
    while (point === exclude) {
      console.log(start, end, exclude);
      point = Math.floor(Math.random() * (end - start) + start);
    }
    return point;
  };

  // division = (xStart, xEnd, yStart, yEnd, horizontal) => {
  //   if (xEnd - xStart < 2 || yEnd - yStart < 2) return;

  //   if (horizontal) {
  //     const midPoint = Math.floor((xEnd - xStart) / 2) + xStart;
  //     const gap = Math.floor(Math.random() * (yEnd - yStart) + yStart);
  //     for (let i = yStart; i <= yEnd; i++) {
  //       if (this.grid[i][midPoint] !== GRID_OBJECTS.EMPTY || i === gap)
  //         continue;
  //       this.grid[i][midPoint] = GRID_OBJECTS.WALL;
  //       this.logSteps(midPoint, i, GRID_OBJECTS.WALL);
  //     }
  //     this.division(xStart, midPoint, yStart, yEnd, !horizontal); //left grid
  //     this.division(midPoint + 1, xEnd, yStart, yEnd, !horizontal); //right grid
  //   } else {
  //     const midPoint = Math.floor((yEnd - yStart) / 2) + yStart;
  //     const gap = Math.floor(Math.random() * (xEnd - xStart) + xStart);
  //     for (let i = xStart; i <= xEnd; i++) {
  //       if (this.grid[midPoint][i] !== GRID_OBJECTS.EMPTY || i === gap)
  //         continue;
  //       this.grid[midPoint][i] = GRID_OBJECTS.WALL;
  //       this.logSteps(i, midPoint, GRID_OBJECTS.WALL);
  //     }
  //     this.division(xStart, xEnd, yStart, midPoint, !horizontal); //top grid
  //     this.division(xStart, xEnd, midPoint + 1, yEnd, !horizontal); //bottom grid
  //   }
  // };
}

export default RecursiveDivision;

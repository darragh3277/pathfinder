import React, { useState, useRef, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "./constants/Constants";
import RecursiveDivision from "./algorithms/grids/RecursiveDivision";
import RecursiveDivisionVertical from "./algorithms/grids/RecursiveDivisionVertical";
import RecursiveDivisionHorizontal from "./algorithms/grids/RecursiveDivisionHorizontal";
import EmptyGrid from "./algorithms/grids/EmptyGrid";
import StairsPattern from "./algorithms/grids/StairsPattern";
import Dijkstra from "./algorithms/pathfinders/Dijkstra";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
  },
}));

const nodeDimension = 25; //size of each block
const drawMazeSpeed = 10; //speed mazes are drawn at
const drawSearchSpeed = 5; //speed search is drawn at
const drawPathSpeed = 20; //speed shortest path is drawn at

function Pathfinder() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");
  const [selectedGrid, setSelectedGrid] = useState("Empty");
  const [selectedObject, setSelectedObject] = useState(GRID_OBJECTS.WALL);
  const [detourAdded, setDetourAdded] = useState(false);
  const [grid, setGrid] = useState([]);
  const gridRef = useRef();
  let mousePressed = false;

  const handleAlgorithmChange = (e) => {
    const algorithmName = e.target.value;
    setSelectedAlgorithm(algorithmName);
  };

  const handleGridChange = (e) => {
    const gridType = e.target.value;
    setSelectedGrid(gridType);

    let gridAlgorithm;
    let emptyGrid = resetGrid();
    switch (gridType) {
      case "Recursive Division":
        gridAlgorithm = new RecursiveDivision(emptyGrid);
        break;
      case "Vertical Recursive Division":
        gridAlgorithm = new RecursiveDivisionVertical(emptyGrid);
        break;
      case "Horizontal Recursive Division":
        gridAlgorithm = new RecursiveDivisionHorizontal(emptyGrid);
        break;
      case "Simple Stair Pattern":
        gridAlgorithm = new StairsPattern(emptyGrid);
        break;
      default:
        break;
    }

    if (gridAlgorithm) {
      const steps = gridAlgorithm.getSteps();
      if (steps.length > 0) {
        const update = setInterval(() => {
          const step = steps.shift();
          gridRef.current
            .querySelectorAll(
              'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
            )[0]
            .classList.add("wall");
          if (steps.length === 0) {
            clearInterval(update);
          }
        }, drawMazeSpeed);
        setGrid(gridAlgorithm.getGrid());
      }
    } else {
      setGrid(emptyGrid);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangeSelectedObject = () => {
    const newObject =
      selectedObject === GRID_OBJECTS.WALL
        ? GRID_OBJECTS.WEIGHT
        : GRID_OBJECTS.WALL;
    setSelectedObject(newObject);
  };

  const handleClickDetourButton = (e) => {
    if (!detourAdded) {
      setSelectedObject(GRID_OBJECTS.DETOUR);
    } else {
      const newGrid = grid.map((rows) => {
        return rows.map((node) => {
          return node.objectType === GRID_OBJECTS.DETOUR
            ? GRID_OBJECTS.EMPTY
            : node;
        });
      });
      setDetourAdded(false);
      setGrid(newGrid);
    }
  };

  const handleClickClearPathButton = (e) => {
    const newGrid = grid.map((rows) => {
      return rows.map((node) => {
        if (
          node.objectType === GRID_OBJECTS.VISITED ||
          node.objectType === GRID_OBJECTS.PATH
        ) {
          node.objectType = GRID_OBJECTS.EMPTY;
        }
        return node;
      });
    });
    const searchPath = gridRef.current.querySelectorAll(".search-path");
    searchPath.forEach((path) => {
      path.classList.remove("search-path");
    });
    const shortestPath = gridRef.current.querySelectorAll(".shortest-path");
    shortestPath.forEach((path) => {
      path.classList.remove("shortest-path");
    });
    setGrid(newGrid);
  };

  const handleDragStart = (node, e) => {
    e.dataTransfer.setData("col", node.col);
    e.dataTransfer.setData("row", node.row);
    e.dataTransfer.setData("objectType", node.objectType);
  };

  const handleDrop = (targetNode, e) => {
    e.preventDefault();
    if (
      targetNode.objectType === GRID_OBJECTS.START ||
      targetNode.objectType === GRID_OBJECTS.END ||
      e.dataTransfer.getData("col") === "" ||
      e.dataTransfer.getData("row") === "" ||
      e.dataTransfer.getData("objectType") === ""
    )
      return;
    const originCol = e.dataTransfer.getData("col");
    const originRow = e.dataTransfer.getData("row");
    grid[originRow][originCol].objectType = GRID_OBJECTS.EMPTY;
    targetNode.objectType = parseInt(e.dataTransfer.getData("objectType"));
    e.target.parentElement.classList.remove("wall");
    e.target.parentElement.classList.remove("weight");
    setGrid([...grid]);
  };

  const resetGrid = () => {
    //Another hacky solution to get react to play nice
    //with altering the DOM directly
    const walls = gridRef.current.querySelectorAll(".wall");
    walls.forEach((wall) => {
      wall.classList.remove("wall");
    });
    const weights = gridRef.current.querySelectorAll(".weight");
    weights.forEach((weight) => {
      weight.classList.remove("weight");
    });
    const searchPath = gridRef.current.querySelectorAll(".search-path");
    searchPath.forEach((path) => {
      path.classList.remove("search-path");
    });
    const shortestPath = gridRef.current.querySelectorAll(".shortest-path");
    shortestPath.forEach((path) => {
      path.classList.remove("shortest-path");
    });
    setDetourAdded(false);
    return buildGrid();
  };

  const handleClickClearBoardButton = () => {
    setGrid(resetGrid());
    setSelectedGrid("Empty");
  };

  const handleClickRunButton = () => {
    const pathfinder = new Dijkstra(grid);
    if (pathfinder) {
      const path = pathfinder.getSearchPath();
      if (path.length > 0) {
        const update = setInterval(() => {
          const step = path.shift();
          gridRef.current
            .querySelectorAll(
              'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
            )[0]
            .firstElementChild.classList.add("search-path");
          if (path.length === 0) {
            clearInterval(update);
            drawShortestPath(pathfinder.getShortestPath());
          }
        }, drawSearchSpeed);
      }
    }
  };

  const drawShortestPath = (shortestPath) => {
    const update = setInterval(() => {
      const step = shortestPath.pop();
      gridRef.current
        .querySelectorAll(
          'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
        )[0]
        .firstElementChild.classList.add("shortest-path");
      if (shortestPath.length === 0) {
        clearInterval(update);
      }
    }, drawPathSpeed);
  };

  const handleMouseDown = (node, ref) => {
    if (
      node.objectType !== GRID_OBJECTS.EMPTY &&
      node.objectType !== GRID_OBJECTS.WALL &&
      node.objectType !== GRID_OBJECTS.WEIGHT
    )
      return false;
    mousePressed = true;
    updateGrid(node, ref);
  };

  const handleMouseEnter = (node, ref) => {
    if (
      node.objectType !== GRID_OBJECTS.EMPTY &&
      node.objectType !== GRID_OBJECTS.WALL &&
      node.objectType !== GRID_OBJECTS.WEIGHT
    )
      return false;
    if (mousePressed === false) return;
    updateGrid(node, ref);
  };

  const handleMouseUp = () => {
    mousePressed = false;
    setGrid([...grid]);
  };

  const handleMouseLeave = () => {
    if (mousePressed === false) return;
    mousePressed = false;
    setGrid([...grid]);
  };

  const updateGrid = (node, ref) => {
    //triggering large amounts of react state changes
    //causes performance issues. I've implemented a hacky
    //solution to update the DOM directly using refs.
    //This should not be replicated
    if (selectedObject === GRID_OBJECTS.WALL) {
      switch (node.objectType) {
        case GRID_OBJECTS.EMPTY:
          ref.current.classList.add("wall");
          node.objectType = GRID_OBJECTS.WALL;
          break;
        case GRID_OBJECTS.WALL:
          ref.current.classList.remove("wall");
          node.objectType = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WEIGHT:
          ref.current.classList.remove("weight");
          ref.current.classList.add("wall");
          node.objectType = GRID_OBJECTS.WALL;
          break;
        default:
          return;
      }
    } else if (selectedObject === GRID_OBJECTS.WEIGHT) {
      switch (node.objectType) {
        case GRID_OBJECTS.EMPTY:
          ref.current.classList.add("weight");
          node.objectType = GRID_OBJECTS.WEIGHT;
          break;
        case GRID_OBJECTS.WEIGHT:
          ref.current.classList.remove("weight");
          node.objectType = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WALL:
          ref.current.classList.remove("wall");
          ref.current.classList.add("weight");
          node.objectType = GRID_OBJECTS.WEIGHT;
          break;
        default:
          return;
      }
    } else if (selectedObject === GRID_OBJECTS.DETOUR) {
      ref.current.classList.remove("weight");
      ref.current.classList.remove("wall");
      node.objectType = GRID_OBJECTS.DETOUR;
      setDetourAdded(true);
      setSelectedObject(GRID_OBJECTS.WALL);
    }
  };

  useEffect(() => {
    setGrid(buildGrid());
  }, []); //onMount

  const buildGrid = () => {
    const width = gridRef.current.clientWidth;
    const height = gridRef.current.clientHeight;
    return new EmptyGrid(width, height, nodeDimension);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        handleAlgorithmChange={handleAlgorithmChange}
        selectedAlgorithm={selectedAlgorithm}
        handleGridChange={handleGridChange}
        selectedGrid={selectedGrid}
        selectedObject={selectedObject}
        detourAdded={detourAdded}
        handleChangeSelectedObject={handleChangeSelectedObject}
        handleClickDetourButton={handleClickDetourButton}
        handleClickClearPathButton={handleClickClearPathButton}
        handleClickClearBoardButton={handleClickClearBoardButton}
        handleClickRunButton={handleClickRunButton}
      />
      <Grid
        gridRef={gridRef}
        grid={grid}
        nodeDimension={nodeDimension}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        selectedObject={selectedObject}
      />
    </div>
  );
}

export default Pathfinder;

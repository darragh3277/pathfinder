import React, { useState, useRef, useEffect, useCallback } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "./constants/Constants";
import BasicGrid from "./algorithms/grids/BasicGrid";
import RecursiveDivision from "./algorithms/grids/RecursiveDivision";
import RecursiveDivisionVertical from "./algorithms/grids/RecursiveDivisionVertical";
import RecursiveDivisionHorizontal from "./algorithms/grids/RecursiveDivisionHorizontal";
import EmptyGrid from "./algorithms/grids/EmptyGrid";
import StairsPattern from "./algorithms/grids/StairsPattern";
import Dijkstra from "./algorithms/pathfinders/Dijkstra";
import AStar from "./algorithms/pathfinders/AStar";
import GreedyBFS from "./algorithms/pathfinders/GreedyBFS";
import BFS from "./algorithms/pathfinders/BFS";
import DFS from "./algorithms/pathfinders/DFS";

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
  const [selectedObject, _setSelectedObject] = useState("Wall");
  const [detourAdded, setDetourAdded] = useState(false);
  const [running, _setRunning] = useState(false);
  const [grid, setGrid] = useState([]);
  const selectedObjectRef = React.useRef(selectedObject);
  const runningRef = React.useRef(running);
  const gridRef = useRef();
  let mousePressed = false;

  const buildGrid = () => {
    const width = gridRef.current.clientWidth;
    const height = gridRef.current.clientHeight;
    return new EmptyGrid(width, height, nodeDimension);
  };

  const setSelectedObject = (object) => {
    selectedObjectRef.current = object;
    _setSelectedObject(object);
  };

  const setRunning = (running) => {
    runningRef.current = running;
    _setRunning(running);
  };

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleGridTypeChange = (e) => {
    setSelectedGrid(e.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangeSelectedObject = (e) => {
    setSelectedObject(e.target.value);
  };

  const handleClickClearBoardButton = () => {
    setGrid(resetGrid());
    setSelectedGrid("Empty");
  };

  const handleClickClearDetourButton = () => {
    setDetourAdded(false);
    const newGrid = grid.map((rows) => {
      return rows.map((node) => {
        if (node.objectType === GRID_OBJECTS.DETOUR) {
          node.objectType = GRID_OBJECTS.EMPTY;
        }
        return node;
      });
    });
    setGrid(newGrid);
  };

  const clearPath = () => {
    grid.map((rows) => {
      return rows.map((node) => {
        if (
          node.objectType === GRID_OBJECTS.VISITED ||
          node.objectType === GRID_OBJECTS.PATH
        ) {
          node.objectType = GRID_OBJECTS.EMPTY;
        }
        node.distance = Infinity;
        node.heuristic = Infinity;
        node.prevNode = null;
        node.visited = false;
        return node;
      });
    });
    gridRef.current.querySelectorAll(".search-path").forEach((path) => {
      path.classList.remove("search-path");
    });
    gridRef.current.querySelectorAll(".shortest-path").forEach((path) => {
      path.classList.remove("shortest-path");
    });
    gridRef.current.querySelectorAll(".secondary").forEach((path) => {
      path.classList.remove("secondary");
    });
  };

  const handleClickClearPathButton = () => {
    clearPath();
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
    clearPath();
  };

  const resetGrid = useCallback(() => {
    //Another hacky solution to get react to play nice
    //with altering the DOM directly
    gridRef.current.querySelectorAll(".wall").forEach((wall) => {
      wall.classList.remove("wall");
    });
    gridRef.current.querySelectorAll(".weight").forEach((weight) => {
      weight.classList.remove("weight");
    });
    gridRef.current.querySelectorAll(".search-path").forEach((path) => {
      path.classList.remove("search-path");
    });
    gridRef.current.querySelectorAll(".shortest-path").forEach((path) => {
      path.classList.remove("shortest-path");
    });
    setDetourAdded(false);
    return buildGrid();
  }, []);

  const getAlgorithm = (grid) => {
    switch (selectedAlgorithm) {
      case "A*":
        return new AStar(grid);
      case "Greedy Best-First Search":
        return new GreedyBFS(grid);
      case "Breadth-First Search":
        return new BFS(grid);
      case "Depth-First Search":
        return new DFS(grid);
      default:
        return new Dijkstra(grid);
    }
  };

  const handleClickRunButton = () => {
    clearPath();
    setGrid([...grid]);
    setRunning(true);
    setMobileOpen(false);
    const pathfinder = getAlgorithm(grid);
    if (pathfinder) {
      const path = pathfinder.getSearchPath();
      if (path.length > 0) {
        const update = setInterval(() => {
          const step = path.shift();
          const node = gridRef.current.querySelectorAll(
            'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
          )[0].firstElementChild;
          if (node.classList.contains("search-path")) {
            node.classList.remove("search-path");
            void node.offsetWidth;
          }
          node.classList.add("search-path");
          if (step.secondaryPath === true) node.classList.add("secondary");
          if (path.length === 0) {
            clearInterval(update);
            drawShortestPath(pathfinder.getShortestPath());
          }
        }, drawSearchSpeed);
      } else {
        setRunning(false);
      }
    }
  };

  const drawShortestPath = (shortestPath) => {
    if (shortestPath.length === 0) {
      setRunning(false);
      return;
    }
    const update = setInterval(() => {
      const step = shortestPath.pop();
      const node = gridRef.current.querySelectorAll(
        'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
      )[0];
      node.firstElementChild.classList.remove("search-path");
      node.firstElementChild.classList.remove("secondary");
      //if the shortest path retraces itself we retrigger the animation
      if (node.firstElementChild.classList.contains("shortest-path")) {
        node.firstElementChild.classList.remove("shortest-path");
        void node.firstElementChild.offsetWidth;
      }
      node.firstElementChild.classList.add("shortest-path");
      if (shortestPath.length === 0) {
        clearInterval(update);
        setRunning(false);
      }
    }, drawPathSpeed);
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

  const handleMouseDown = (node, ref) => {
    if (
      node.objectType !== GRID_OBJECTS.EMPTY &&
      node.objectType !== GRID_OBJECTS.WALL &&
      node.objectType !== GRID_OBJECTS.WEIGHT
    )
      return false;
    if (runningRef.current === true) return;
    mousePressed = true;
    updateGrid(node, ref);
  };

  //todo efficent grid update
  const handleMouseUp = () => {
    mousePressed = false;
  };

  //todo efficent grid update
  const handleMouseLeave = () => {
    mousePressed = false;
  };

  const updateGrid = (node, ref) => {
    //triggering large amounts of react state changes
    //causes performance issues. I've implemented a hacky
    //solution to update the DOM directly using refs.
    //This should not be replicated
    const domNodeElement = ref.current.firstElementChild;
    if (selectedObjectRef.current === "Wall") {
      switch (node.objectType) {
        case GRID_OBJECTS.EMPTY:
          domNodeElement.classList.add("wall");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          node.objectType = GRID_OBJECTS.WALL;
          break;
        case GRID_OBJECTS.WALL:
          domNodeElement.classList.remove("wall");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          node.objectType = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WEIGHT:
          domNodeElement.classList.remove("weight");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          domNodeElement.classList.add("wall");
          node.objectType = GRID_OBJECTS.WALL;
          break;
        default:
          return;
      }
    } else if (selectedObjectRef.current === "Weight") {
      switch (node.objectType) {
        case GRID_OBJECTS.EMPTY:
          domNodeElement.classList.add("weight");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          node.objectType = GRID_OBJECTS.WEIGHT;
          break;
        case GRID_OBJECTS.WEIGHT:
          domNodeElement.classList.remove("weight");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          node.objectType = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WALL:
          domNodeElement.classList.remove("wall");
          domNodeElement.classList.remove("search-path");
          domNodeElement.classList.remove("secondary");
          domNodeElement.classList.remove("shortest-path");
          domNodeElement.classList.add("weight");
          node.objectType = GRID_OBJECTS.WEIGHT;
          break;
        default:
          return;
      }
    } else if (selectedObjectRef.current === "Detour") {
      domNodeElement.classList.remove("weight");
      domNodeElement.classList.remove("search-path");
      domNodeElement.classList.remove("secondary");
      domNodeElement.classList.remove("shortest-path");
      domNodeElement.classList.remove("wall");
      node.objectType = GRID_OBJECTS.DETOUR;
      setGrid([...grid]);
      setDetourAdded(true);
      setSelectedObject("Wall");
    }
  };

  useEffect(() => {
    let gridAlgorithm;
    const emptyGrid = resetGrid();
    switch (selectedGrid) {
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
      case "Basic Random Maze":
        gridAlgorithm = new BasicGrid(emptyGrid, GRID_OBJECTS.WALL);
        break;
      case "Basic Weight Maze":
        gridAlgorithm = new BasicGrid(emptyGrid, GRID_OBJECTS.WEIGHT);
        break;
      default:
        setGrid(emptyGrid);
        return;
    }
    setRunning(true);
    setMobileOpen(false);
    const steps = gridAlgorithm.getSteps();
    if (steps.length > 0) {
      const update = setInterval(() => {
        const objectClass =
          gridAlgorithm.getType() === GRID_OBJECTS.WALL ? "wall" : "weight";
        const step = steps.shift();
        gridRef.current
          .querySelectorAll(
            'td[data-col="' + step.col + '"][data-row="' + step.row + '"]'
          )[0]
          .firstElementChild.classList.add(objectClass);
        if (steps.length === 0) {
          clearInterval(update);
          setRunning(false);
          setGrid(gridAlgorithm.getGrid());
        }
      }, drawMazeSpeed);
    }
  }, [selectedGrid, resetGrid]);

  useEffect(() => {
    setGrid(buildGrid());
  }, []); //onMount

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        selectedAlgorithm={selectedAlgorithm}
        selectedGrid={selectedGrid}
        selectedObject={selectedObject}
        detourAdded={detourAdded}
        running={running}
        handleDrawerToggle={handleDrawerToggle}
        handleAlgorithmChange={handleAlgorithmChange}
        handleGridTypeChange={handleGridTypeChange}
        handleClickRunButton={handleClickRunButton}
        handleChangeSelectedObject={handleChangeSelectedObject}
        handleClickClearPathButton={handleClickClearPathButton}
        handleClickClearBoardButton={handleClickClearBoardButton}
        handleClickClearDetourButton={handleClickClearDetourButton}
      />
      <Grid
        gridRef={gridRef}
        grid={grid}
        nodeDimension={nodeDimension}
        selectedObject={selectedObject}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    </div>
  );
}

export default Pathfinder;

import React, { useState, useRef, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS, DETOUR_STATUS } from "./constants/GridObjects";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
  },
}));

const nodeDimension = 25; //size of each block

function Pathfinder() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedGrid, setSelectedGrid] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");
  const [selectedObject, setSelectedObject] = useState(GRID_OBJECTS.WALL);
  const [detourAdded, setDetourAdded] = useState(false);
  const [grid, setGrid] = useState([]);
  const gridRef = useRef();
  let mousePressed = false;

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleGridChange = (e) => {
    setSelectedGrid(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSelectedSpeed(e.target.value);
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
        return rows.map((object) => {
          return object === GRID_OBJECTS.DETOUR ? GRID_OBJECTS.EMPTY : object;
        });
      });
      setDetourAdded(false);
      setGrid(newGrid);
    }
  };

  const handleClickClearPathButton = (e) => {
    //todo
  };

  const handleDragStart = (col, row, e) => {
    e.dataTransfer.setData("col", col);
    e.dataTransfer.setData("row", row);
    e.dataTransfer.setData("object", grid[row][col]);
  };

  const handleDrop = (col, row, e) => {
    e.preventDefault();
    if (
      grid[row][col] === GRID_OBJECTS.START ||
      grid[row][col] === GRID_OBJECTS.END
    )
      return;
    if (
      e.dataTransfer.getData("object") === "" ||
      e.dataTransfer.getData("row") === "" ||
      e.dataTransfer.getData("col") === ""
    )
      return;
    grid[row][col] = parseInt(e.dataTransfer.getData("object"));
    grid[e.dataTransfer.getData("row")][e.dataTransfer.getData("col")] =
      GRID_OBJECTS.EMPTY;
    e.target.parentElement.classList.remove("wall");
    e.target.parentElement.classList.remove("weight");
    setGrid([...grid]);
  };

  const handleClickClearBoardButton = () => {
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
    setGrid(buildGrid());
  };

  const handleClickRunButton = (e) => {
    //todo
  };

  const handleMouseDown = (col, row, object, ref) => {
    if (
      object !== GRID_OBJECTS.EMPTY &&
      object !== GRID_OBJECTS.WALL &&
      object !== GRID_OBJECTS.WEIGHT
    )
      return false;
    mousePressed = true;
    updateGrid(col, row, ref);
  };

  const handleMouseEnter = (col, row, object, ref) => {
    if (
      object !== GRID_OBJECTS.EMPTY &&
      object !== GRID_OBJECTS.WALL &&
      object !== GRID_OBJECTS.WEIGHT
    )
      return false;
    if (mousePressed === false) return;
    updateGrid(col, row, ref);
  };

  const handleMouseUp = () => {
    mousePressed = false;
    //delay to prevent animation stuttering
    //from state update
    setTimeout(setGrid([...grid]), 1000);
  };

  const handleMouseLeave = () => {
    if (mousePressed === false) return;
    mousePressed = false;
    //delay to prevent animation stuttering
    //from state update
    setTimeout(setGrid([...grid]), 1000);
  };

  const updateGrid = (col, row, ref) => {
    //triggering large amounts of react state changes
    //causes performance issues. I've implemented a hacky
    //solution to update the DOM directly using refs.
    //This should not be replicated
    if (selectedObject === GRID_OBJECTS.WALL) {
      switch (grid[row][col]) {
        case GRID_OBJECTS.EMPTY:
          ref.current.classList.add("wall");
          grid[row][col] = GRID_OBJECTS.WALL;
          break;
        case GRID_OBJECTS.WALL:
          ref.current.classList.remove("wall");
          grid[row][col] = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WEIGHT:
          ref.current.classList.remove("weight");
          ref.current.classList.add("wall");
          grid[row][col] = GRID_OBJECTS.WALL;
          break;
        default:
          return;
      }
    } else if (selectedObject === GRID_OBJECTS.WEIGHT) {
      switch (grid[row][col]) {
        case GRID_OBJECTS.EMPTY:
          ref.current.classList.add("weight");
          grid[row][col] = GRID_OBJECTS.WEIGHT;
          break;
        case GRID_OBJECTS.WEIGHT:
          ref.current.classList.remove("weight");
          grid[row][col] = GRID_OBJECTS.EMPTY;
          break;
        case GRID_OBJECTS.WALL:
          ref.current.classList.remove("wall");
          ref.current.classList.add("weight");
          grid[row][col] = GRID_OBJECTS.WEIGHT;
          break;
        default:
          return;
      }
    } else if (selectedObject === GRID_OBJECTS.DETOUR) {
      setDetourAdded(true);
      setSelectedObject(GRID_OBJECTS.WALL);
      ref.current.classList.remove("weight");
      ref.current.classList.remove("wall");
      grid[row][col] = GRID_OBJECTS.DETOUR;
    }
  };

  useEffect(() => {
    setGrid(buildGrid());
  }, []); //onMount

  const buildGrid = () => {
    const grid = [];
    const width = gridRef.current.clientWidth;
    const height = gridRef.current.clientHeight;
    const numRows = Math.floor(height / nodeDimension);
    const numCols = Math.floor(width / nodeDimension);
    // return [[0]];
    let row = [];
    for (let i = 0; i < numCols; i++) {
      row.push(GRID_OBJECTS.EMPTY);
    }
    for (let i = 0; i < numRows; i++) {
      grid.push([...row]);
    }
    //set default start and end points
    const verticalMidPoint = Math.floor(grid.length / 2);
    grid[verticalMidPoint][Math.floor(row.length * 0.25)] = GRID_OBJECTS.START;
    grid[verticalMidPoint][Math.floor(row.length * 0.75)] = GRID_OBJECTS.END;
    return grid;
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
        handleSpeedChange={handleSpeedChange}
        selectedSpeed={selectedSpeed}
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

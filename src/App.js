import React, { useState, useRef, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "./constants/GridObjects";

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
  const [selectedWall, setSelectedWall] = useState(true);
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

  const handleToggleWallWeightButton = () => {
    setSelectedWall(!selectedWall);
  };

  const handleClickDetourButton = (e) => {
    //todo
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
    //todo
    e.preventDefault();
    if (
      grid[row][col] === GRID_OBJECTS.START ||
      grid[row][col] === GRID_OBJECTS.END
    )
      return;
    grid[row][col] = parseInt(e.dataTransfer.getData("object"));
    grid[e.dataTransfer.getData("row")][e.dataTransfer.getData("col")] =
      GRID_OBJECTS.EMPTY;
    e.target.parentElement.classList.remove("makeStyles-wall-31");
    setGrid([...grid]);
  };

  const handleClickClearBoardButton = () => {
    //Another hacky solution to get react to play nice
    //with altering the DOM directly
    const walls = gridRef.current.querySelectorAll(".makeStyles-wall-31");
    walls.forEach((wall) => {
      wall.classList.remove("makeStyles-wall-31");
    });
    setGrid(buildGrid());
  };

  const handleClickRunButton = (e) => {
    //todo
  };

  const handleMouseDown = (col, row, object, ref) => {
    if (object !== GRID_OBJECTS.EMPTY && object !== GRID_OBJECTS.WALL)
      return false;
    mousePressed = true;
    updateGrid(col, row, ref);
  };

  const handleMouseEnter = (col, row, object, ref) => {
    if (object !== GRID_OBJECTS.EMPTY && object !== GRID_OBJECTS.WALL)
      return false;
    if (mousePressed === false) return;
    updateGrid(col, row, ref);
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

  const updateGrid = (col, row, ref) => {
    //triggering large amounts of react state changes
    //causes performance issues. I've implemented a hacky
    //solution to update the DOM directly using refs.
    //This should not be replicated
    if (grid[row][col] === GRID_OBJECTS.WALL) {
      ref.current.classList.remove("makeStyles-wall-31");
      grid[row][col] = GRID_OBJECTS.EMPTY;
    } else if (grid[row][col] === GRID_OBJECTS.EMPTY) {
      ref.current.classList.add("makeStyles-wall-31");
      grid[row][col] = GRID_OBJECTS.WALL;
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
        selectedWall={selectedWall}
        handleToggleWallWeightButton={handleToggleWallWeightButton}
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
      />
    </div>
  );
}

export default Pathfinder;

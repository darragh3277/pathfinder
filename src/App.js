import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
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
  const [mousePressed, setMousePressed] = useState(false);
  const [grid, setGrid] = useState([]);
  const gridRef = useRef();

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

  const handleClickWeightButton = (e) => {
    //todo
  };

  const handleClickDetourButton = (e) => {
    //todo
  };

  const handleClickClearPathButton = (e) => {
    //todo
  };

  const handleClickClearBoardButton = () => {
    setGrid(buildGrid());
  };

  const handleClickRunButton = (e) => {
    //todo
  };

  const handleMouseDown = (col, row) => {
    setMousePressed(true);
    updateGrid(col, row);
  };

  const handleMouseEnter = (col, row) => {
    if (mousePressed === false) return;
    updateGrid(col, row);
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  const updateGrid = (col, row) => {
    const newGrid = [...grid];
    if (grid[row][col] === GRID_OBJECTS.WALL) {
      grid[row][col] = GRID_OBJECTS.EMPTY;
    } else if (grid[row][col] === GRID_OBJECTS.EMPTY) {
      grid[row][col] = GRID_OBJECTS.WALL;
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    setGrid(buildGrid());
  }, []); //onMount

  const buildGrid = () => {
    let grid = [];
    let width = gridRef.current.clientWidth;
    let height = gridRef.current.clientHeight;
    let numRows = Math.floor(width / nodeDimension);
    let numCols = Math.floor(height / nodeDimension);

    let row = [];
    for (let i = 0; i < numRows; i++) {
      row.push(GRID_OBJECTS.EMPTY);
    }
    for (let i = 0; i < numCols; i++) {
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
        handleClickWeightButton={handleClickWeightButton}
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
      />
    </div>
  );
}

Pathfinder.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Pathfinder;

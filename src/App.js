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

const nodeDimension = 20; //size of each block

function Pathfinder() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedGrid, setSelectedGrid] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");
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

  const handleClickClearBoardButton = (e) => {
    //todo
  };

  const handleClickRunButton = (e) => {
    //todo
  };

  useEffect(() => {
    console.log("updating grid..");
    setGrid(buildGrid());
  }, []); //onMount

  const buildGrid = () => {
    let grid = [];
    let width = gridRef.current.clientWidth;
    let height = gridRef.current.clientHeight;
    let numRows = Math.floor(width / nodeDimension);
    let numCols = Math.floor(height / nodeDimension);
    console.log(width, height, numRows, numCols);

    let row = [];
    for (let i = 0; i < numRows; i++) {
      row.push(GRID_OBJECTS.EMPTY);
    }
    for (let i = 0; i < numCols; i++) {
      grid.push(row);
    }
    return grid;
    // grid[10][10] = start;
    // grid[20][20] = end;
    // console.log(grid);
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
      <Grid gridRef={gridRef} grid={grid} nodeDimension={nodeDimension} />
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

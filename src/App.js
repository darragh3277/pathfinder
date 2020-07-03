import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
  },
}));

const blockDimension = 10; //size of each block

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

  useEffect(() => {
    if (grid.length === 0) {
      setGrid(buildGrid());
    }
  });

  const buildGrid = () => {
    let width = gridRef.current.clientWidth;
    let height = gridRef.current.clientHeight;
    let numRows = Math.floor(width / blockDimension);
    let numCols = Math.floor(height / blockDimension);
    const empty = 0;
    const start = 1;
    const end = 2;
    const wall = 3;

    let row = [];
    for (let i = 0; i < numCols; i++) {
      row.push(0);
    }
    let grid = [];
    for (let i = 0; i < numRows; i++) {
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
      />
      <Grid gridRef={gridRef} />
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

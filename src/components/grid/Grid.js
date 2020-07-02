import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dijkstra from "../../algorithms/Dijkstra";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    flexDirection: "column",
    height: "100vh",
    display: "flex",
    padding: theme.spacing(3),
  },
  gridContainer: {
    flexGrow: "1",
  },
}));

const Grid = () => {
  const classes = useStyles();
  const gridRef = useRef();
  const blockDimension = 10; //size of each block

  useEffect(() => {
    let width = gridRef.current.clientWidth;
    let height = gridRef.current.clientHeight;
    let rows = Math.floor(width / blockDimension);
    let cols = Math.floor(height / blockDimension);
    console.log(width, height, rows, cols);
  });

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container ref={gridRef} className={classes.gridContainer}>
        <div id="test">sddf</div>
      </Container>
    </main>
  );
};

export default Grid;

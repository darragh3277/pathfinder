import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Node from "../node/Node";

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
  gridTable: {
    border: "1px solid black",
    borderCollapse: "collapse",
  },
}));

const Grid = (props) => {
  const classes = useStyles();
  const {
    gridRef,
    grid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
    nodeDimension,
  } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container ref={gridRef} className={classes.gridContainer}>
        <table
          className={classes.gridTable}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
          <tbody>
            {grid.map((rows, rowInd) => {
              return (
                <tr key={rowInd} className={classes.gridTable}>
                  {rows.map((node, nodeInd) => {
                    return (
                      <Node
                        key={nodeInd}
                        row={rowInd}
                        col={nodeInd}
                        node={node}
                        handleMouseDown={handleMouseDown}
                        handleMouseEnter={handleMouseEnter}
                        nodeDimension={nodeDimension}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </main>
  );
};

export default Grid;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  node: {
    width: "20px",
    height: "20px",
    border: "1px solid black",
  },
  gridTable: {
    border: "1px solid black",
    borderCollapse: "collapse",
  },
}));

const Grid = (props) => {
  const classes = useStyles();
  const { gridRef, grid } = props;

  const nodes = grid.map((cols, i) => {
    console.log(grid.length, cols.length);
    const columns = cols.map((node, j) => {
      return <td key={j} className={classes.node}></td>;
    });

    return (
      <tr key={i} className={classes.gridTable}>
        {columns}
      </tr>
    );
  });

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container ref={gridRef} className={classes.gridContainer}>
        <table className={classes.gridTable}>
          <tbody>{nodes}</tbody>
        </table>
      </Container>
    </main>
  );
};

export default Grid;

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
}));

const Grid = (props) => {
  const classes = useStyles();
  const { gridRef } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container ref={gridRef} className={classes.gridContainer}></Container>
    </main>
  );
};

export default Grid;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "../../constants/GridObjects";
import FlagIcon from "@material-ui/icons/Flag";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(() => ({
  // necessary for content to be below app bar
  node: {
    width: "25px",
    height: "25px",
    border: "1px solid black",
  },
  gridObject: {
    width: "100%",
    height: "auto",
  },
  wall: {
    backgroundColor: "blue",
    // transition: "background-color 0.25s",
  },
}));

const getRowObject = (classes, object) => {
  switch (object) {
    case GRID_OBJECTS.START:
      return <PlayArrowIcon className={classes.gridObject} />;
    case GRID_OBJECTS.END:
      return <FlagIcon className={classes.gridObject} />;
    default:
      return null;
  }
};

function Node(props) {
  const classes = useStyles();
  const {
    row,
    col,
    node,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = props;

  return (
    <td
      className={
        classes.node + " " + (node === GRID_OBJECTS.WALL ? classes.wall : null)
      }
      onMouseDown={() => handleMouseDown(col, row)}
      onMouseEnter={() => handleMouseEnter(col, row)}
      onMouseUp={handleMouseUp}
    >
      {getRowObject(classes, node)}
    </td>
  );
}

export default Node;

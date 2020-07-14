import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridObject from "./GridObject";

const useStyles = makeStyles(() => ({
  node: {
    border: "1px solid black",
    padding: "0",
  },
  wall: {
    animationName: "$wallAnimation",
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationDirection: "alternate",
    animationIterationCount: "1",
    animationFillMode: "forwards",
    animationPlayState: "running",
  },
  "@keyframes wallAnimation": {
    "0%": {
      transform: "scale(0.3)",
      backgroundColor: "rgb(63, 81, 181)",
    },
    "50%": {
      transform: "scale(1.2)",
      backgroundColor: "rgb(63, 81, 181)",
    },
    "100%": {
      transform: "scale(1.0)",
      backgroundColor: "rgb(63, 81, 181)",
    },
  },
}));

const onDragOver = (e) => {
  e.preventDefault();
  return false;
};

function Node(props) {
  const {
    row,
    col,
    node,
    handleMouseDown,
    handleMouseEnter,
    nodeDimension,
    handleDragStart,
    handleDrop,
  } = props;
  const classes = useStyles({ nodeDimension });
  const nodeRef = useRef();

  return (
    <td
      ref={nodeRef}
      className={classes.node}
      onMouseDown={() => handleMouseDown(col, row, node, nodeRef)}
      onMouseEnter={() => handleMouseEnter(col, row, node, nodeRef)}
      onDrop={(e) => handleDrop(col, row, e)}
      onDragOver={onDragOver}
    >
      <GridObject
        object={node}
        handleDragStart={handleDragStart}
        col={col}
        row={row}
      />
    </td>
  );
}

export default Node;

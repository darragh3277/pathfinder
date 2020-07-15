import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridObject from "./GridObject";
import "./Node.css";

const useStyles = makeStyles(() => ({
  node: {
    border: "1px solid black",
    padding: "0",
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

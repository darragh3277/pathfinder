import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridObject from "./GridObject";
import "./Node.css";

const useStyles = makeStyles(() => ({
  node: {
    border: "1px solid #d1c4e9",
    padding: "0",
  },
}));

const onDragOver = (e) => {
  e.preventDefault();
  return false;
};

const Node = (props) => {
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
      onMouseDown={() => handleMouseDown(node, nodeRef)}
      onMouseEnter={() => handleMouseEnter(node, nodeRef)}
      onDrop={(e) => handleDrop(node, e)}
      onDragOver={onDragOver}
      data-col={col}
      data-row={row}
    >
      <GridObject node={node} handleDragStart={handleDragStart} />
    </td>
  );
};

export default Node;

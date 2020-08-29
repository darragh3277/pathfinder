import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "../../constants/Constants";
import RoomIcon from "@material-ui/icons/Room";
import NearMeIcon from "@material-ui/icons/NearMe";
import AddLocationIcon from "@material-ui/icons/AddLocation";

const useStyles = makeStyles(() => ({
  object: {
    width: "100%",
    height: "auto",
    color: "#f44336",
  },
  span: {
    overflow: "hidden",
    width: "24px",
    height: "24px",
  },
}));

function GridObject(props) {
  const classes = useStyles();
  const { node, handleDragStart } = props;
  if (node.objectType === 4) {
    console.log("detour render");
  }
  switch (node.objectType) {
    case GRID_OBJECTS.START:
      return (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(node, e)}
          className={classes.span}
        >
          <NearMeIcon className={classes.object} />
        </div>
      );
    case GRID_OBJECTS.END:
      return (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(node, e)}
          className={classes.span}
        >
          <RoomIcon className={classes.object} />
        </div>
      );
    case GRID_OBJECTS.DETOUR:
      return (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(node, e)}
          className={classes.span}
        >
          <AddLocationIcon className={classes.object} />
        </div>
      );
    default:
      return <div className={classes.span}></div>;
  }
}

export default GridObject;

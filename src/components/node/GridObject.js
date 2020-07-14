import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GRID_OBJECTS } from "../../constants/GridObjects";
import FlagIcon from "@material-ui/icons/Flag";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(() => ({
  object: {
    width: "100%",
    height: "auto",
  },
}));

function GridObject(props) {
  const classes = useStyles();
  const { col, row, object, handleDragStart } = props;
  switch (object) {
    case GRID_OBJECTS.START:
      return (
        <span
          draggable="true"
          onDragStart={(e) => handleDragStart(col, row, e)}
        >
          <PlayArrowIcon className={classes.object} />
        </span>
      );
    case GRID_OBJECTS.END:
      return (
        <span
          draggable="true"
          onDragStart={(e) => handleDragStart(col, row, e)}
        >
          <FlagIcon className={classes.object} />
        </span>
      );
    default:
      return <></>;
  }
}

export default GridObject;

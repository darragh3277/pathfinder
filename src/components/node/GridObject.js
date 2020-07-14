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
  span: {
    overflow: "hidden",
    width: "24px",
    height: "24px",
  },
}));

function GridObject(props) {
  const classes = useStyles();
  const { col, row, object, handleDragStart } = props;
  switch (object) {
    case GRID_OBJECTS.START:
      return (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(col, row, e)}
          className={classes.span}
        >
          <PlayArrowIcon className={classes.object} />
        </div>
      );
    case GRID_OBJECTS.END:
      return (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(col, row, e)}
          className={classes.span}
        >
          <FlagIcon className={classes.object} />
        </div>
      );
    default:
      return <div className={classes.span}></div>;
  }
}

export default GridObject;

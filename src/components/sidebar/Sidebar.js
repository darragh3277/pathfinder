import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Dropdown from "./dropdown/Dropdown";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { GRID_OBJECTS } from "../../constants/GridObjects";
// import Dijkstra from "../../algorithms/Dijkstra";

const drawerWidth = 240;

const algorithms = [
  { id: 1, name: "Dijkstra" },
  { id: 2, name: "A*" },
  { id: 3, name: "Greedy Best-first Search" },
  { id: 4, name: "Swarm Algorithm" },
  { id: 5, name: "Convergent Swarm Algorithm" },
  { id: 6, name: "Bidirectional Swarm Algorithm" },
  { id: 7, name: "Breadth-first Search" },
  { id: 8, name: "Depth-first Search" },
];

const grids = [
  { id: 1, name: "Recursive Division" },
  { id: 2, name: "Recursive Division (vertical skew" },
  { id: 3, name: "Recursive Division (horizontal skew" },
  { id: 4, name: "Basic Random Maze" },
  { id: 5, name: "Basic Weight Maze" },
  { id: 6, name: "Simple Stair Pattern" },
];

const speeds = [
  { id: 1, name: "Fast", speed: 10 },
  { id: 2, name: "Medium", speed: 100 },
  { id: 3, name: "Slow", speed: 500 },
];

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%",
  },
  sidebar: {
    textAlign: "center",
  },
  button: {
    width: "70%",
  },
}));

const Sidebar = (props) => {
  const {
    window,
    handleDrawerToggle,
    mobileOpen,
    handleAlgorithmChange,
    selectedAlgorithm,
    handleGridChange,
    selectedGrid,
    handleSpeedChange,
    selectedSpeed,
    selectedObject,
    handleClickDetourButton,
    handleClickClearPathButton,
    handleClickClearBoardButton,
    handleClickRunButton,
    handleChangeSelectedObject,
  } = props;
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();

  const drawer = (
    <div className={classes.sidebar}>
      <div className={classes.toolbar} />
      <Divider />
      <Dropdown
        value={selectedAlgorithm}
        handleChange={handleAlgorithmChange}
        options={algorithms}
        label="Algorithm"
      />
      <Dropdown
        value={selectedGrid}
        handleChange={handleGridChange}
        options={grids}
        label="Grid"
      />
      <Dropdown
        value={selectedSpeed}
        handleChange={handleSpeedChange}
        options={speeds}
        label="Speed"
      />
      <Grid>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleChangeSelectedObject}
        >
          {selectedObject === GRID_OBJECTS.WEIGHT ? "Weight" : "Wall"}
        </Button>
      </Grid>
      <Grid>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClickDetourButton}
        >
          Detour
        </Button>
      </Grid>
      <Grid>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClickClearPathButton}
        >
          Clear Path
        </Button>
      </Grid>
      <Grid>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClickClearBoardButton}
        >
          Clear Board
        </Button>
      </Grid>
      <Grid>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClickRunButton}
        >
          Run
        </Button>
      </Grid>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;

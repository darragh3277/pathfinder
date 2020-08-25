import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Dropdown from "./dropdown/Dropdown";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import {
  ALGORITHMS,
  GRID_TYPES,
  OPTIONAL_OBJECTS,
} from "../../constants/Constants";

const drawerWidth = 240;

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
    mobileOpen,
    detourAdded,
    runDisabled,
    selectedGrid,
    selectedObject,
    selectedAlgorithm,
    handleDrawerToggle,
    handleClickRunButton,
    handleGridTypeChange,
    handleAlgorithmChange,
    handleChangeSelectedObject,
    handleClickClearPathButton,
    handleClickClearBoardButton,
    handleClickClearDetourButton,
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
        options={ALGORITHMS}
        label="Algorithm"
      />
      <Dropdown
        value={selectedGrid}
        handleChange={handleGridTypeChange}
        options={GRID_TYPES}
        label="Grid"
      />
      <Dropdown
        value={selectedObject}
        handleChange={handleChangeSelectedObject}
        options={OPTIONAL_OBJECTS}
        label="Add"
      />
      <Grid>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClickClearDetourButton}
          disabled={!detourAdded}
        >
          Clear Detour
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
          disabled={runDisabled}
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

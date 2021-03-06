import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tutorial from "../tutorial/Tutorial";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbarButton: {
    marginLeft: "auto",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { handleDrawerToggle } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Pathfinder
        </Typography>
        <div className={classes.toolbarButton}>
          <Tutorial />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

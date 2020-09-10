import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const algorithims = [
  {
    name: "Dijkstra",
    description: "is a weighted algorithim that garuantees the shortest path.",
  },
  {
    name: "A*",
    description:
      " uses heuristics to garuntee the shortest path. Also a weight algorithim. ",
  },
  {
    name: "Greed Best-First Search",
    description:
      " similar to A*, it's faster and weighted but doesn't gaurantee the shortest path.  ",
  },
  {
    name: "Breadth-First Search",
    description: " is unweighted and guarantees the shortest path. ",
  },
  {
    name: "Depth-Frist Search",
    description:
      " a useful algorithim but not in pathfinding, it's unweighted and does not garuantee the shortest path. ",
  },
];

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Tutorial() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const RenderAlgorithimDescriptions = () => {
    return algorithims.map((algorithim) => {
      return (
        <Typography gutterBottom>
          <i>{algorithim.name}</i> {algorithim.description}
        </Typography>
      );
    });
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open tutorial"
        onClick={handleClickOpen}
      >
        <HelpOutlineIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Pathfinder
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Welcome to pathfinder, an application to help visualise how
            pathfinding algorithms work.
          </Typography>
          <Typography varaint="h5" gutterBottom>
            <b>Grids</b>
          </Typography>
          <Typography gutterBottom>
            Generate grids or draw your own, then choose your pathfinding
            algorithim and hit run.
          </Typography>
          <Typography varaint="h5" gutterBottom>
            <b>Weights & Detours</b>
          </Typography>
          <Typography gutterBottom>
            Add weights to increase the cost of going through a node, or add a
            detour that the algorithim must find first.
          </Typography>
          <Typography varaint="h5" gutterBottom>
            <b>Algorithims</b>
          </Typography>
          {RenderAlgorithimDescriptions()}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tutorial;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%",
  },
}));

const buildOptions = (options) =>
  options.map((option) => {
    return (
      <MenuItem key={option.id} value={option.name}>
        {option.name}
      </MenuItem>
    );
  });

export default (props) => {
  const { value, handleChange, options, label } = props;
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={"select-label-" + label}>{label}</InputLabel>
      <Select
        labelId={"select-label-" + label}
        id={"select-" + label}
        value={value}
        onChange={handleChange}
      >
        {buildOptions(options)}
      </Select>
    </FormControl>
  );
};

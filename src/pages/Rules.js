import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({}));

function Rules() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

export default Rules;
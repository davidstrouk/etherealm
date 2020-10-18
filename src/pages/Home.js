import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    textAlign: "center",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button component={Link} to="/newGame" color="primary">
          Create New Game
        </Button>
      </Grid>
    </div>
  );
}

export default Home;

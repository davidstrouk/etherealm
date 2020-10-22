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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Button
            component={Link}
            variant="contained"
            to="/newGame"
            color="primary"
          >
            Create New Game
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            variant="contained"
            disabled
            to="/mintCollectibles"
            color="primary"
          >
            Mint collectibles
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            variant="contained"
            disabled
            to="/upgradeGameContract"
            color="primary"
          >
            Upgrade game contract
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

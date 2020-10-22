import Button from "@material-ui/core/Button";
import FromWiki from "./FromWiki";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({}));

function Collectibles({ setStepCompleted }) {
  const classes = useStyles({
    root: {
      width: "100%",
    },
  });

  const [fromWikidata, setFromWikidata] = useState(true);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              // onClick={() => setFromWikidata(!fromWikidata)}
              color="primary"
            >
              From Wikidata
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" disabled color="primary">
              Manual
            </Button>
          </Grid>
        </Grid>
        {fromWikidata && <FromWiki setStepCompleted={setStepCompleted} />}
      </Grid>
    </div>
  );
}

export default Collectibles;

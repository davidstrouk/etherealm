import Button from "@material-ui/core/Button";
import FromWiki from "./FromWiki";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({}));

function Collectibles() {
  const classes = useStyles();

  const [fromWikidata, setFromWikidata] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={() => setFromWikidata(!fromWikidata)} color="primary">
          From Wikidata
        </Button>
        <Button color="primary">Manual</Button>
        {fromWikidata && <FromWiki />}
      </Grid>
    </div>
  );
}

export default Collectibles;

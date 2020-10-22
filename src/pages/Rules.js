import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles(() => ({}));

function Rules() {
  const classes = useStyles();

  const [rules, setRules] = useState([
    {
      name: "Give GOLD to new player",
      if: "New minted NFT",
      then: "Transfer 1000 GOLD",
    },
  ]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">IF</TableCell>
                <TableCell align="right">THEN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.name}>
                  <TableCell component="th" scope="row">
                    {rule.name}
                  </TableCell>
                  <TableCell align="right">{rule.if}</TableCell>
                  <TableCell align="right">{rule.then}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default Rules;

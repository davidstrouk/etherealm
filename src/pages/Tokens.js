import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({}));

function Tokens() {
  const classes = useStyles();

  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");

  const addToken = () => {
    setTokens(
      tokens.concat({
        name: tokenName,
        supply: tokenSupply,
      })
    );
    setNewToken(false);
    setTokenName("");
    setTokenSupply("");
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={() => setNewToken(!newToken)}>New token</Button>
        {newToken && (
          <Box>
            <TextField
              value={tokenName}
              onChange={(event) => setTokenName(event.target.value)}
              label="Name"
              variant="outlined"
            />
            <TextField
              value={tokenSupply}
              onChange={(event) => setTokenSupply(event.target.value)}
              label="Supply"
            />
            <Button onClick={addToken}>Add</Button>
          </Box>
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Supply</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.name}>
                  <TableCell component="th" scope="row">
                    {token.name}
                  </TableCell>
                  <TableCell align="right">{token.supply}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default Tokens;

import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import ItemsList from "../components/ItemsList";
import React from "react";
import TextField from "@material-ui/core/TextField";
import fetch from "cross-fetch";
import { makeStyles } from "@material-ui/core/styles";
import queryFromWikidata from "../api/Wikidata";
import { useDebounce } from "use-debounce";

const R = require("ramda");

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: "100%",
  },
  description: {
    color: "grey",
    fontSize: 12,
  },
}));

function sparqlQuery(item_id) {
  const query =
    "SELECT ?item WHERE { ?item wdt:P31/wdt:P279* wd:" + item_id + " .}";

  const fullUrl =
    "https://query.wikidata.org/sparql?query=" + encodeURIComponent(query);
  const headers = { Accept: "application/sparql-results+json" };

  return fetch(fullUrl, { headers }).then((body) => body.json());
}

function FromWiki({ setStepCompleted }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedOptionItemCount, setSelectedOptionItemCount] = React.useState(
    0
  );
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [showItemsTable, setShowItemsTable] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    if (debouncedSearchText.length >= 3) {
      (async () => {
        setLoading(true);

        const params = {
          action: "wbsearchentities",
          format: "json",
          search: debouncedSearchText,
          language: "en",
          props: "",
        };

        const entities = await queryFromWikidata(params).then(
          (response) => response.search
        );

        if (active) {
          setOptions(entities);
        }
        setLoading(false);
      })();
    }

    return () => {
      active = false;
    };
  }, [debouncedSearchText]);

  React.useEffect(() => {
    if (selectedOption) {
      (async () => {
        const apiResponse = await sparqlQuery(selectedOption.id);
        const items = apiResponse.results.bindings.map((x) =>
          R.last(x.item.value.split("/"))
        );
        const uniqueItems = Array.from(new Set(items));
        setSelectedItems(uniqueItems);
        setSelectedOptionItemCount(uniqueItems.length);
      })();
    }
  }, [selectedOption]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>Search for a category (for example "city")</Grid>
        <Grid item>
          <Autocomplete
            freeSolo
            id="autocomplete"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onChange={(event, value) => {
              setSelectedOption(value);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onInputChange={(event, value) => {
              setSearchText(value);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            options={options}
            loading={loading}
            renderOption={(option) => (
              <Grid container direction={"column"}>
                <Grid item>{option.label}</Grid>
                <Grid item>
                  <Box className={classes.description}>
                    {option.description}
                  </Box>
                </Grid>
              </Grid>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            inputValue={searchText}
          />
        </Grid>
        {selectedOptionItemCount !== 0 ? (
          <Grid item>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Box>There are {selectedOptionItemCount} items in this list.</Box>
              <Button
                color="primary"
                onClick={() => {
                  setShowItemsTable(!showItemsTable);
                  setStepCompleted(true);
                }}
              >
                Show items
              </Button>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {showItemsTable && (
          <Grid item>
            <ItemsList allItems={selectedItems} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default FromWiki;

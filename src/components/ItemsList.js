import Grid from "@material-ui/core/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from "./ItemCard";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ItemsList({ allItems }) {
  const classes = useStyles();
  const CHUNK_SIZE = 10;
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const [displayedLastIndex, setDisplayedLastIndex] = React.useState(0);

  React.useEffect(() => {
    if (allItems) {
      setSelectedItems(allItems);
      setDisplayedItems(allItems.slice(0, CHUNK_SIZE));
      setDisplayedLastIndex(CHUNK_SIZE);
    }
  }, [allItems]);

  const handleToggle = (itemId) => () => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems(selectedItems.concat([itemId]));
    }
  };

  const addDisplayedItems = () => {
    setDisplayedItems(
      displayedItems.concat(
        allItems.slice(displayedLastIndex, displayedLastIndex + CHUNK_SIZE)
      )
    );
    setDisplayedLastIndex(displayedLastIndex + CHUNK_SIZE);
  };

  return (
    <InfiniteScroll
      dataLength={displayedItems.length}
      next={addDisplayedItems}
      hasMore={displayedItems.length !== allItems.length}
      loader="Loading..."
    >
      <Grid
        container
        spacing={4}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {displayedItems.map((value) => (
          <Grid key={value} item>
            <ItemCard
              itemId={value}
              handleToggle={handleToggle}
              selectedItems={selectedItems}
            />
          </Grid>
        ))}
      </Grid>{" "}
    </InfiniteScroll>
  );
}

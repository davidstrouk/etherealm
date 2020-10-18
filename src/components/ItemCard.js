import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import queryFromWikidata from "../api/Wikidata";
import queryFromWikipedia from "../api/Wikipedia";
const md5 = require("md5");
const R = require("ramda");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
});

function getImageUrlFromImageObj(imageObj) {
  const name = imageObj.datavalue.value.replace(/ /g, "_");
  const hashName = md5(name);
  return (
    "https://upload.wikimedia.org/wikipedia/commons/" +
    hashName[0] +
    "/" +
    hashName.slice(0, 2) +
    "/" +
    name
  );
}

export default function ItemCard({ itemId, handleToggle, selectedItems }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [itemUrl, setItemUrl] = React.useState("");

  const DEFAULT_IMAGE_URL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

  React.useEffect(() => {
    (async () => {
      const itemMetadataQueryParams = {
        action: "wbgetentities",
        format: "json",
        ids: itemId,
        props: "sitelinks/urls",
        sitefilter: "enwiki",
      };

      const titleQueryParams = {
        action: "wbgetentities",
        format: "json",
        ids: itemId,
        languages: "en",
        props: "labels",
      };

      const imageQueryParams = {
        action: "wbgetclaims",
        format: "json",
        entity: itemId,
        property: "P18",
      };

      const itemMetadata = await queryFromWikidata(
        itemMetadataQueryParams
      ).then((response) =>
        response.entities[itemId].sitelinks
          ? response.entities[itemId].sitelinks.enwiki
          : null
      );

      if (!itemMetadata) {
        const titleFromWikidata = await queryFromWikidata(
          titleQueryParams
        ).then((response) =>
          response.entities[itemId].labels.en
            ? response.entities[itemId].labels.en.value
            : "Untitled"
        );
        setTitle(titleFromWikidata);

        const imageUrl = await queryFromWikidata(
          imageQueryParams
        ).then((response) =>
          response.claims.P18
            ? getImageUrlFromImageObj(response.claims.P18[0].mainsnak)
            : DEFAULT_IMAGE_URL
        );
        setImageUrl(imageUrl);

        const wikidataUrl = "https://www.wikidata.org/wiki/" + itemId;
        setItemUrl(wikidataUrl);
      } else {
        const titleFromWikipedia = itemMetadata.title;
        setTitle(titleFromWikipedia);

        const wikipediaUrl = itemMetadata.url;
        setItemUrl(wikipediaUrl);

        const titleForImageUrlQuery = R.last(wikipediaUrl.split("/"));
        const wikipediaPagesImagesResponse = await queryFromWikipedia({
          action: "query",
          format: "json",
          titles: titleForImageUrlQuery,
          pilicense: "any",
          pithumbsize: "200",
          prop: "pageimages",
        }).then((response) => Object.values(response.query.pages));
        const imageUrlFromWikipedia = wikipediaPagesImagesResponse[0].thumbnail
          ? wikipediaPagesImagesResponse[0].thumbnail.source
          : DEFAULT_IMAGE_URL;

        setImageUrl(imageUrlFromWikipedia);
      }
    })();
  }, [itemId]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {imageUrl ? (
          <CardMedia className={classes.media} image={imageUrl} title={title} />
        ) : (
          <CircularProgress />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={itemUrl}>
          View
        </Button>
        <Checkbox
          edge="end"
          onChange={handleToggle(itemId)}
          checked={selectedItems.includes(itemId)}
          // inputProps={{ 'aria-labelledby': labelId }}
        />
      </CardActions>
    </Card>
  );
}

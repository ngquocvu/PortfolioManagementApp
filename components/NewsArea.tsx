import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { StringifyOptions } from "querystring";
import React, { useEffect } from "react";
import { useState } from "react";
import { numberWithCommas } from "../utils/stock";
const useStyles = makeStyles({
  root: {
    margin: "0 1rem",
    minHeight: 225,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface News {
  datetime: string;
  countArticles: number;
  articles: [
    {
      title: string;
      article_url: string;
      description: string;
      image_url: string;
      source_name: string;
      source_url: string;
    }
  ];
}
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const NewsArea = ({ searchQuery }) => {
  const classes = useStyles();
  const query = "Chứng khoán";
  const ACCESS_KEY =
    "7ZIwusa4FApDAzlvcvmc7DzheOYLxPdVjQKE0v4bQJ0gxcgSXXqaXzo5SAAV";

  const [news, setNews] = useState<News>({
    datetime: "",
    countArticles: 0,
    articles: [
      {
        title: "",
        article_url: "",
        description: "",
        image_url: "",
        source_name: "",
        source_url: "",
      },
    ],
  });

  const defaultProps = {
    borderColor: "text.primary",
    m: 1,
    p: 3,

    style: { minHeight: "14rem", cursor: "pointer" },
    border: 1,
  };

  useEffect(() => {
    axios(
      "https://gnewsapi.net/api/search?q=" +
        query +
        "&language=vi&country=vn&api_token=" +
        ACCESS_KEY,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Grid container>
        {news.countArticles !== 0 ? (
          news.articles.map((each) => (
            <Grid item sm={12} md={3}>
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openInNewTab("https://stackoverflow.com");
                }}
                borderRadius={5}
                {...defaultProps}
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {each.title}
                </Typography>
                {/* <Typography
                  variant="body2"
                  gutterBottom
                  color="textSecondary"
                  component="p"
                >
                 {each.title}
                </Typography> */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="right"
                  gutterBottom
                  component="p"
                >
                  {each.source_name}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <>
            <Typography
              variant="body2"
              gutterBottom
              color="textSecondary"
              align="center"
              component="p"
            >
              Không có tin tức mới
            </Typography>
          </>
        )}
      </Grid>
    </div>
  );
};
export default NewsArea;

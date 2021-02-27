import {
  Button,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  Grid,
  Theme,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import React, { useEffect } from "react";
import * as Constants from "../../../utils/constants";
import { useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForwardIos,
  ArrowRight,
} from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 1rem",
      padding: "1rem",
      minHeight: "45vh",
      width: "26vw",
      [theme.breakpoints.down("md")]: {
        width: "50vh",
        height: "60vh",
      },
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
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
  })
);

interface News {
  totalCount: number;
  data: [
    {
      id: string;
      symbol: string;
      typeDesc: string;
      content: string;
    }
  ];
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const NewsArea = () => {
  const classes = useStyles();

  const NewsCard = (each, index) => {
    return (
      <Card
        key={each.id}
        className={classes.root}
        style={{ cursor: "pointer" }}
        onClick={() => {}}
        {...defaultProps}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            style={{ whiteSpace: "pre-line" }}
          >
            {index + ". " + each.newsTitle}
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            variant="subtitle1"
            gutterBottom
            align="justify"
            style={{ whiteSpace: "pre-line" }}
          >
            {each.newsAbstract}
          </Typography>

          <Typography variant="body2" align="right" color="textSecondary">
            {"Nguồn: " + each.newsSource}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const [news, setNews] = useState<News>({
    data: [{ id: "0", symbol: "", typeDesc: "", content: "" }],
    totalCount: -1,
  });

  const defaultProps = {
    style: { cursor: "pointer", margin: "20" },
    border: 1,
  };

  useEffect(() => {
    axios
      .get(Constants.TOP_NEWS, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        console.log(res.data);

        setNews(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return news.totalCount === 0 ? (
    <Typography
      gutterBottom
      variant="body1"
      color="textSecondary"
      align="center"
    >
      Không có sự kiện mới
    </Typography>
  ) : (
    <div>
      <ScrollMenu
        data={
          news.totalCount === -1
            ? [1, 2, 3, 4, 5].map((each, index) => {
                return (
                  <Skeleton
                    key={index}
                    variant="rect"
                    className={classes.root}
                    animation="wave"
                  />
                );
              })
            : news.data.map((each, index) => {
                return NewsCard(each, index + 1);
              })
        }
        wheel={false}
        transition={0.6}
        scrollBy={2}
        alignCenter={false}
        inertiaScrolling={true}
        inertiaScrollingSlowdown={2}
      />
    </div>
  );
};
export default NewsArea;

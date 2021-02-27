import {
  CardContent,
  createStyles,
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
      height: "18vh",
      width: "16vw",
      [theme.breakpoints.down("md")]: {
        width: "30vh",
        height: "20vh",
      },
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
    skeleton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "16vw",
      height: "18vh",
      [theme.breakpoints.down("md")]: {
        width: "30vh",
        height: "20vh",
      },
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

function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const EventsArea = () => {
  const classes = useStyles();

  const NewsCard = (each) => {
    return (
      <Card
        key={each.id}
        className={classes.root}
        style={{ cursor: "pointer" }}
        onClick={() => {}}
        {...defaultProps}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {each.symbol}
          </Typography>
          <Typography variant="subtitle1" component="h6">
            {each.typeDesc}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {each.content}
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
      .get(
        Constants.GET_EVENTS_URL +
          "?fromEffDate=" +
          formatDate() +
          "&toEffDate=" +
          formatDate(),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
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
      Không có tin mới
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
                    className={classes.skeleton}
                    animation="wave"
                  />
                );
              })
            : news.data.map((each) => {
                return NewsCard(each);
              })
        }
        wheel={false}
        transition={0.3}
        scrollBy={4}
        alignCenter={false}
        inertiaScrolling={true}
        inertiaScrollingSlowdown={2}
      />
    </div>
  );
};
export default EventsArea;

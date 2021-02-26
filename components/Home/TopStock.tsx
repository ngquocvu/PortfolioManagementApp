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
import * as Constants from "../../utils/constants";
import { useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForwardIos,
  ArrowRight,
} from "@material-ui/icons";
import StockCard from "../StockCard";
import SmallStockCard from "./SmallStockCard";
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
    },
    [theme.breakpoints.down("md")]: {
      width: "30vh",
      height: "20vh",
    },
  })
);

interface stockInfo {
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

const stockInfoArea = () => {
  const classes = useStyles();

  const defaultProps = {
    style: { cursor: "pointer", margin: "20" },
    border: 1,
  };

  const [stockStat, setStockStat] = useState({ o: [], c: [], t: [], v: [] });

  useEffect(() => {
    axios
      .get(Constants.HISTORYCAL_DATA_URL + "ITA", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        // setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <ScrollMenu
        data={
          0 === 0
            ? ["ITA", "CTG", "TCB", "KBC", "ROS"].map((each) => {
                return <SmallStockCard each={each} />;
              })
            : [1, 2, 3, 4, 5].map((each, index) => {
                return (
                  <Skeleton
                    key={index}
                    variant="rect"
                    className={classes.skeleton}
                    animation="wave"
                  />
                );
              })
        }
        wheel={false}
        transition={0.3}
        scrollBy={4}
        inertiaScrolling={true}
        inertiaScrollingSlowdown={2}
      />
    </div>
  );
};
export default stockInfoArea;

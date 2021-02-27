import {
  Box,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as Constants from "../../../utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Line,
  LineChart,
} from "recharts";
import { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 1rem",
      height: "31vh",
      width: "16vw",
      [theme.breakpoints.down("md")]: {
        width: "32vh",
        height: "32vh",
      },
    },
  })
);

const calPercentage = (prevData, currData) => {
  let data = currData / (prevData / 100) - 100;
  return Number.parseFloat(data.toFixed(2));
};

const exchangeTime = (timeRange) => {
  let date = new Date();

  switch (timeRange) {
    case "DAY":
      date.setDate(date.getDate() - 2);
      break;
    case "MONTH":
      date.setDate(date.getDate() - 30);
      break;
    case "WEEK":
      date.setDate(date.getDate() - 7);
      break;
    case "YEAR":
      date.setDate(date.getDate() - 365);
      break;
  }
  return date;
};

const StockCard = ({ each }: any) => {
  const classes = useStyles();
  const timeParams =
    "&from=" + Math.round(exchangeTime("MONTH").getTime() / 1000);
  const [stockStat, setStockStat] = useState({
    o: [1, 2, 3],
    c: [],
    t: [],
    v: [],
  });
  useEffect(() => {
    axios
      .get(Constants.HISTORYCAL_DATA_URL + each + timeParams, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {stockStat.c.length == 0 ? (
        <div className={classes.root}>
          <Skeleton variant="rect" animation="wave" height="30%" />
          <Skeleton variant="rect" animation="wave" height="70%" />
        </div>
      ) : (
        <Card
          className={classes.root}
          style={{ cursor: "pointer" }}
          onClick={() => {}}
        >
          <CardContent>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", display: "flex" }}
              component="h5"
            >
              {each}
              <Typography
                style={{
                  marginLeft: "10px",
                  fontWeight: "bold",
                  color:
                    calPercentage(
                      stockStat.c.slice(-2)[0],
                      stockStat.c.slice(-1)
                    ) < 0
                      ? Constants.SELL_COLOR
                      : Constants.BUY_COLOR,
                }}
                variant="body1"
              >
                {calPercentage(
                  stockStat.c.slice(-2)[0],
                  stockStat.c.slice(-1)
                ) + "% (24h)"}
              </Typography>
            </Typography>
            <Typography variant="h4" component="h5">
              {stockStat.c.slice(-1).pop()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(
                stockStat.t.slice(-1).pop() * 1000
              ).toLocaleDateString()}
            </Typography>
          </CardContent>
          <CardActions>
            <ResponsiveContainer width="99%" aspect={3}>
              <LineChart
                data={stockStat.c.map((cur, index) => ({
                  close: stockStat.c[index],
                  time: new Date(
                    stockStat.t[index] * 1000
                  ).toLocaleDateString(),
                }))}
              >
                <XAxis dataKey="date" hide={true} />
                <YAxis
                  type="number"
                  domain={["auto", "auto"]}
                  dataKey="close"
                  hide={true}
                />
                <Line
                  type="monotone"
                  dataKey="close"
                  dot={false}
                  autoReverse={true}
                  stroke={
                    calPercentage(
                      stockStat.c.slice(-2)[0],
                      stockStat.c.slice(-1)
                    ) < 0
                      ? Constants.SELL_COLOR
                      : Constants.BUY_COLOR
                  }
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardActions>
        </Card>
      )}
    </>
  );
};
export default StockCard;

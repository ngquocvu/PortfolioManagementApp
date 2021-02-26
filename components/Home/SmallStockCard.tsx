import {
  Box,
  Card,
  CardContent,
  createStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as Constants from "../../utils/constants";
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
      height: "23vh",
      width: "16vw",
      [theme.breakpoints.down("md")]: {
        width: "25vh",
        height: "25vh",
      },
    },
  })
);

const calPercentage = (prevData, currData) => {
  let data = currData / (prevData / 100) - 100;
  return Number.parseFloat(data.toFixed(2));
};

const StockCard = ({ each }: any) => {
  const classes = useStyles();
  const [stockStat, setStockStat] = useState({
    o: [1, 2, 3],
    c: [],
    t: [],
    v: [],
  });
  useEffect(() => {
    axios
      .get(Constants.HISTORYCAL_DATA_URL + each, {
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
          <Skeleton variant="text" height="15%" width="100%" animation="wave" />

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
              {each}{" "}
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
                ) + "%"}
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              style={{ fontWeight: "lighter" }}
              component="h5"
            >
              {stockStat.c.slice(-1).pop()}
            </Typography>

            <div style={{ width: "100%", height: "5vw" }}>
              <ResponsiveContainer>
                <LineChart
                  data={stockStat.c.map((cur, index) => ({
                    close: stockStat.c[index],
                    time: new Date(
                      stockStat.t[index] * 1000
                    ).toLocaleDateString(),
                  }))}
                >
                  <XAxis dataKey="date" hide={true} />
                  <Line
                    type="monotone"
                    dataKey="close"
                    dot={false}
                    autoReverse={true}
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="body2" color="textSecondary"></Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default StockCard;

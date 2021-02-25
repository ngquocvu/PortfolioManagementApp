import {
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
        width: "40vh",
        height: "25vh",
      },
    },
  })
);

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
    <Card
      className={classes.root}
      style={{ cursor: "pointer" }}
      onClick={() => {}}
    >
      {stockStat.c.length == 0 ? (
        <Skeleton animation="wave" height="100%" />
      ) : (
        <div>
          <CardContent>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold" }}
              component="h4"
            >
              {each}
            </Typography>
            <Typography gutterBottom variant="h5" style={{}} component="h5">
              {stockStat.o.slice(-1).pop()}
            </Typography>
            <div style={{ width: "100%", height: "8vh" }}>
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
        </div>
      )}
    </Card>
  );
};
export default StockCard;

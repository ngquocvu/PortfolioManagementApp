import axios from "axios";
import * as Constants from "../utils/constants";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Skeleton from "@material-ui/lab/Skeleton";

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

const IndexChart = ({ code, timeRange }) => {
  const [stockStat, setStockStat] = useState({ o: [], c: [], t: [], v: [] });
  const codeParams = "symbol=" + code;

  const timeParams =
    "to=" +
    Math.round(new Date().getTime() / 1000) +
    "&from=" +
    Math.round(exchangeTime(timeRange).getTime() / 1000);

  useEffect(() => {
    axios
      .get(
        Constants.HISTORYCAL_DATA_URL_WITHOUT_PARAM +
          codeParams +
          "&" +
          timeParams,
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
        setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, [code, timeRange]);
  return (
    <div style={{ width: "100%", height: 300 }}>
      {stockStat.o.length > 0 ? (
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={300}
            data={stockStat.c.map((cur, index) => ({
              close: stockStat.c[index],
              time: new Date(stockStat.t[index] * 1000).toLocaleDateString(),
            }))}
          >
            <Tooltip contentStyle={{ color: "black" }} />
            <XAxis dataKey="time" minTickGap={150} />
            <YAxis type="number" domain={["auto", "auto"]} dataKey="close" />

            <Area
              type="monotone"
              stroke={
                stockStat.c.slice(-1) > stockStat.c.slice(-2)[0]
                  ? "#61d457"
                  : "#e34444"
              }
              dataKey="close"
              fill={
                stockStat.c.slice(-1) > stockStat.c.slice(-2)[0]
                  ? "#61d457"
                  : "#e34444"
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton animation="wave" height="100%" />
      )}
    </div>
  );
};

export default IndexChart;

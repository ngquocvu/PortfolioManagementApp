import axios from "axios";
import * as Constants from "./constants";
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

const IndexChart = ({ code }) => {
  const [stockStat, setStockStat] = useState({ o: [], c: [], t: [], v: [] });

  useEffect(() => {
    axios
      .get(Constants.HISTORYCAL_DATA_URL + code, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        console.log(res.data);
        setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
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
            stroke="#61d457"
            dataKey="close"
            fill="#61d457"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndexChart;

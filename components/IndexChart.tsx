import axios from "axios";
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
} from "recharts";

const IndexChart = () => {
  const ACCESS_KEY = "68bdf0c93a336674f0513c81a5ffc98e";
  const [stockStat, setStockStat] = useState({
    pagination: {},
    data: [{ open: null, date: null }],
  });

  useEffect(() => {
    axios
      .get(
        "http://api.marketstack.com/v1/eod" +
          "?access_key=" +
          ACCESS_KEY +
          "&symbols=" +
          +"ITA.XSTC"
      )
      .then((res) => {
        console.log(res.data);
        setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={500} height={300} data={stockStat.data}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="volume"
            strokeDasharray="5 5"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndexChart;

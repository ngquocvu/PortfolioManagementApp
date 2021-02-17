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
  AreaChart,
  Area,
} from "recharts";

const IndexChart = () => {
  const ACCESS_KEY = "f63c8b0d9ba2d8ac215ba75b7a3c1a36";
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
          "ITA.XSTC"
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
        <AreaChart
          width={500}
          height={300}
          data={stockStat.data.map(({ open, date }) => ({
            open: open,
            date: new Date(Date.parse(date)).toDateString(),
          }))}
        >
          {/* <CartesianGrid strokeDasharray="1 1" /> */}
          <XAxis hide={true} dataKey="date" reversed={true} />
          <YAxis domain={[2000, 7000]} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="open"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndexChart;

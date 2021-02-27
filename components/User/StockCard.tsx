import {
  Button,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Favorite, Info, LensTwoTone, MoreHoriz } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Legend,
  Area,
  Tooltip,
  Line,
  LineChart,
} from "recharts";
import { numberWithCommas } from "../utils/stock";
import StockChart from "./StockChart";
const useStyles = makeStyles({
  root: {
    minWidth: 225,
    margin: "0 1rem",
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
});
const StockCard = ({ name, avgPrice, vol, key, selected }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const BUY_COLOR = "#1eb800";
  const SELL_COLOR = "#f22e1f";
  const ACCESS_KEY = "f63c8b0d9ba2d8ac215ba75b7a3c1a36";
  const [stockStat, setStockStat] = useState({
    pagination: {},
    data: [{ close: null, date: null }],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        "http://api.marketstack.com/v1/eod" +
          "?access_key=" +
          ACCESS_KEY +
          "&symbols=" +
          name +
          ".XSTC"
      )
      .then((res) => {
        console.log(res.data);
        setStockStat(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <StockChart
        open={open}
        handleClose={handleClose}
        name={name}
        stockStat={stockStat}
      />

      <Card className={classes.root}>
        <CardContent>
          <IconButton style={{ float: "right" }} aria-label="add to favorites">
            <Info onClick={() => setOpen(true)} />
          </IconButton>
          <div style={{ display: "flex" }}>
            <Typography variant="h4">{name}</Typography>
          </div>
          <Typography
            variant="h4"
            style={{
              color:
                stockStat.data[0].close - avgPrice > 0 ? BUY_COLOR : SELL_COLOR,
            }}
          >
            {stockStat.data[0].close
              ? numberWithCommas((stockStat.data[0].close - avgPrice) * vol)
              : "Loading..."}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lời / Lỗ
          </Typography>
          <LineChart
            width={300}
            height={150}
            data={stockStat.data.map(({ close, date }) => ({
              close: close,
              date: new Date(Date.parse(date)).toDateString(),
            }))}
          >
            <XAxis dataKey="date" reversed={true} hide={true} />
            <Line
              type="monotone"
              dataKey="close"
              dot={false}
              autoReverse={true}
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
          <div>
            <Typography variant="body2" color="textSecondary">
              Giá mua / Giá thị trường
            </Typography>
            <Typography variant="body2">
              {" "}
              {numberWithCommas(avgPrice)} /{" "}
              {stockStat.data[0].close
                ? numberWithCommas(stockStat.data[0].close)
                : "Loading..."}
            </Typography>
          </div>{" "}
          <div>
            <Typography variant="body2" color="textSecondary">
              {" "}
              Khối lượng: {numberWithCommas(vol)}
            </Typography>
          </div>
          <Typography align="right" variant="body2" color="textSecondary">
            {new Date(stockStat.data[0].date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
export default StockCard;

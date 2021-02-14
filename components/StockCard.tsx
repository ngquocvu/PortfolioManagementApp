import { CardContent, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { LensTwoTone } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { numberWithCommas } from "../utils/stock";
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
  const ACCESS_KEY = "68bdf0c93a336674f0513c81a5ffc98e";
  const [stockStat, setStockStat] = useState({
    pagination: {},
    data: [{ close: null, date: null }],
  });

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
    <Card className={classes.root}>
      <CardContent>
        <div style={{ display: "flex" }}>
          <Typography variant="h5">{name}</Typography>
        </div>

        <Typography variant="h5" color="error">
          {stockStat.data[0].close
            ? numberWithCommas((stockStat.data[0].close - avgPrice) * vol)
            : "Loading..."}
        </Typography>
        <div>
          <Typography variant="body2" color="textSecondary">
            Giá mua / Giá TT
          </Typography>
          <Typography variant="body2">
            {" "}
            {numberWithCommas(avgPrice)} /{" "}
            {stockStat.data[0].close
              ? numberWithCommas(stockStat.data[0].close)
              : "Loading..."}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            {" "}
            KL: {numberWithCommas(vol)}
          </Typography>
        </div>
        <Typography
          style={{ float: "right" }}
          gutterBottom
          variant="body2"
          color="textSecondary"
        >
          {new Date(stockStat.data[0].date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default StockCard;

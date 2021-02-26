import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import * as Constants from "../../utils/constants";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import axios from "axios";
import { useState } from "react";
import {
  TrendingDownRounded,
  TrendingUp,
  TrendingUpRounded,
} from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function SwitchListSecondary() {
  const classes = useStyles();
  const [stockStat, setStockStat] = useState([
    { code: "", name: "", change: 0, price: 0, changePct: 0, lastUpdated: "" },
  ]);
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    axios
      .get(Constants.GET_TRADE_MARKET_INDEX, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        setStockStat(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <List
      subheader={<ListSubheader>Chỉ số trong ngày</ListSubheader>}
      className={classes.root}
    >
      {stockStat.length === 1 ? (
        <>
          {[1, 2, 3, 4, 5].map(() => (
            <ListItem>
              <Skeleton
                variant="text"
                animation="wave"
                height="100%"
                width="100%"
              />
            </ListItem>
          ))}
        </>
      ) : (
        <>
          {" "}
          {stockStat.map((eachIndex) => (
            <ListItem>
              <ListItemIcon>
                {eachIndex.change < 0 ? (
                  <TrendingDownRounded />
                ) : (
                  <TrendingUpRounded />
                )}
              </ListItemIcon>
              <ListItemText primary={eachIndex.code} />
              <ListItemSecondaryAction
                style={{
                  color:
                    eachIndex.change < 0
                      ? Constants.SELL_COLOR
                      : Constants.BUY_COLOR,
                }}
              >
                {eachIndex.price.toFixed(2) +
                  " (" +
                  eachIndex.changePct.toFixed(2) +
                  "%)"}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
}

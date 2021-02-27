import {
  Chip,
  createStyles,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import { GridHeader } from "@material-ui/data-grid";
import { TrendingUp } from "@material-ui/icons";
import React from "react";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(27),

      fontSize: theme.spacing(11),
      height: theme.spacing(27),
    },
    gridItem: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

const ChipsArea = ({ code, setCode, timeRange, setTimeRange }) => {
  const classes = useStyles();
  const TimeRangeChips = ({ small }) => {
    return (
      <>
        <Chip
          label="NGÀY"
          size={small ? "small" : "medium"}
          onClick={() => {
            setTimeRange("DAY");
          }}
          variant={timeRange == "DAY" ? "default" : "outlined"}
        />
        <Chip
          label="TUẦN "
          size={small ? "small" : "medium"}
          onClick={() => {
            setTimeRange("WEEK");
          }}
          variant={timeRange == "WEEK" ? "default" : "outlined"}
        />
        <Chip
          label="THÁNG"
          size={small ? "small" : "medium"}
          onClick={() => {
            setTimeRange("MONTH");
          }}
          variant={timeRange == "MONTH" ? "default" : "outlined"}
        />
        <Chip
          label="NĂM"
          size={small ? "small" : "medium"}
          onClick={() => {
            setTimeRange("YEAR");
          }}
          variant={timeRange == "YEAR" ? "default" : "outlined"}
        />
      </>
    );
  };

  const TradingIndexChips = ({ small }) => {
    return (
      <>
        <Chip
          label="VNINDEX"
          deleteIcon={<TrendingUp />}
          size={small ? "small" : "medium"}
          onDelete={() => {}}
          onClick={() => {
            setCode("VNINDEX");
          }}
          variant={code == "VNINDEX" ? "default" : "outlined"}
        />
        <Chip
          label="HNX"
          deleteIcon={<TrendingUp />}
          size={small ? "small" : "medium"}
          onDelete={() => {}}
          onClick={() => {
            setCode("HNX");
          }}
          variant={code == "HNX" ? "default" : "outlined"}
        />
        <Chip
          label="UPCOM"
          deleteIcon={<TrendingUp />}
          size={small ? "small" : "medium"}
          onDelete={() => {}}
          onClick={() => {
            setCode("UPCOM");
          }}
          variant={code == "UPCOM" ? "default" : "outlined"}
        />
      </>
    );
  };

  return (
    <>
      <Hidden smDown>
        <Grid container spacing={4}>
          <Grid className={classes.root} item md={6}>
            <TradingIndexChips small={false} />
          </Grid>
          <Grid className={classes.root} item md={6}>
            <TimeRangeChips small={false} />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <TradingIndexChips small /> <TimeRangeChips small />
      </Hidden>
    </>
  );
};
export default ChipsArea;

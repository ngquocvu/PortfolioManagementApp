import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import ScriptTag from "react-script-tag";
import * as Constants from "../utils/constants";
import IndexChart from "../components/IndexChart";
import NewsArea from "../components/NewsArea";
import TopStock from "../components/Home/TopStock";
import { TrendingUp } from "@material-ui/icons";
import ChipsArea from "../components/Home/ChipsArea";
import HomeChartInfo from "../components/Home/HomeChartInfo";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        marginLeft: theme.spacing(1),
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

export default function Home({ accounts }) {
  const classes = useStyles();
  const [code, setCode] = useState("VNINDEX");
  const [timeRange, setTimeRange] = useState("DAY");

  return (
    <>
      <Grid container spacing={3}>
        <Typography
          style={{ fontWeight: "bold", marginLeft: "1rem" }}
          variant="h6"
        >
          {"Bảng điểm " + code}
        </Typography>
        <Grid className={classes.gridItem} item xs={12}>
          <ChipsArea
            code={code}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            setCode={setCode}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={9}>
          <IndexChart code={code} timeRange={timeRange} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HomeChartInfo />
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "bold", marginLeft: "1rem" }}
            variant="h6"
          >
            Top 10 cổ phiếu
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TopStock />
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "bold", marginLeft: "1rem" }}
            variant="h6"
          >
            Sự kiện hôm nay
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NewsArea />
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "bold", marginLeft: "1rem" }}
            variant="h6"
          >
            Top Tin Tức
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NewsArea />
        </Grid>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const respone = await fetch(`https://popcorn-review.herokuapp.com/accounts/`);
  const accounts = await respone.json();
  return { props: { accounts } };
}

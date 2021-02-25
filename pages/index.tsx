import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import ScriptTag from "react-script-tag";
import * as Constants from "../utils/constants";
import IndexChart from "../components/IndexChart";
import NewsArea from "../components/NewsArea";
import TopStock from "../components/Home/TopStock";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
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
  })
);

export default function Home({ accounts }) {
  const classes = useStyles();
  const [code, setCode] = useState("VNINDEX");

  return (
    <>
      <Grid container spacing={3}>
        <Typography
          style={{ fontWeight: "lighter", marginLeft: "1rem" }}
          variant="h6"
        >
          {"Bảng điểm Vn-index"}
        </Typography>
        <Grid item xs={12}>
          <IndexChart code={code} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "lighter", marginLeft: "1rem" }}
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
            style={{ fontWeight: "lighter", marginLeft: "1rem" }}
            variant="h6"
          >
            Sự kiện hôm nay
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

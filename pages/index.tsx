import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import Link from "next/link";
import Head from "next/head";
import React from "react";
import AccountList from "../components/AccountList";
import styles from "../styles/Home.module.css";

const useStyles = makeStyles((theme: Theme) =>
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
  return (
    <div className={styles.container}>
      <Head>
        <title>SAM - Stock Account Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={5}
        className={styles.main}
        style={{ display: "flex" }}
      >
        {accounts.map((acc: any) => (
          <Grid item>
            <Link href={`user/${acc._id}`}>
              <CardActionArea>
                <Avatar variant="square" className={classes.large}>
                  {acc.name
                    .split(" ")
                    .map((x) => x.charAt(0))
                    .join("")
                    .substr(0, 2)
                    .toUpperCase()}
                </Avatar>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(`http://127.0.0.1:3006/accounts/`);

  const accounts = await res.json();
  return {
    props: { accounts },
  };
}

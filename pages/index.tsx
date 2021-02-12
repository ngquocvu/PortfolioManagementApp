import {
  Avatar,
  CardActionArea,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { loginState } from "../states";

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
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(loginState);
  useEffect(() => {
    console.log(auth);
    if (auth == false) {
      router.push("./auth");
    }
  });
  return (
    <div>
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
        <Grid item sm={12} md={12}>
          <Typography
            align="center"
            style={{ fontWeight: "lighter" }}
            variant="h2"
          >
            Bạn là... ?
          </Typography>
        </Grid>
        {accounts.map((acc: any) => (
          <Grid item>
            <Link href={`user/${acc._id}`}>
              <CardActionArea>
                <Avatar
                  src="https://www.upsieutoc.com/images/2021/02/03/30db479e1558c3ed46b4ed23b3cd98ae.jpg"
                  variant="square"
                  className={classes.large}
                >
                  {acc.name.split(" ").slice(-1).join(" ")}
                </Avatar>
              </CardActionArea>
            </Link>
            <Typography
              component="h1"
              align="center"
              style={{ fontWeight: "lighter", paddingTop: "1rem" }}
              variant="h6"
            >
              {acc.name.split(" ").slice(-2).join(" ")}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(`http://popcorn-review.herokuapp.com/accounts/`);

  const accounts = await res.json();
  return {
    props: { accounts },
  };
}

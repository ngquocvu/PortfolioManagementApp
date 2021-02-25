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
import styles from "../../styles/Home.module.css";
import { useRecoilState } from "recoil";
import Router from "next/router";
import { tokenState } from "../../states";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Auth from "../auth";

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

export default function Login({ accounts }) {
  const classes = useStyles();
  const router = useRouter();
  const [token, setToken] = useRecoilState(tokenState);

  return token === null ? (
    <Auth />
  ) : (
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
        {accounts.map((acc) => (
          <Grid key={acc.name} item>
            <Link href={`user/${acc._id}`}>
              <CardActionArea>
                <Avatar
                  src="/avatar/default.jpg"
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
  const respone = await fetch(`https://popcorn-review.herokuapp.com/accounts/`);
  const accounts = await respone.json();
  return { props: { accounts } };
}

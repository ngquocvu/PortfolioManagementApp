import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import { AccountCircle, Apps, Home, InfoOutlined } from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { tokenState } from "../states";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      fontWeight: "bold",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  // const [token, setToken] = useRecoilState(tokenState);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <Link href="/">
            <IconButton
              color="inherit"
              edge="end"
              className={classes.menuButton}
            >
              <Apps />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {"iBoard"}
          </Typography>

          <Link href="/login">
            <IconButton color="inherit" edge="end">
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;

import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import {
  AccountCircle,
  Apps,
  Home,
  InfoOutlined,
  Search,
} from "@material-ui/icons";
import { fade, InputBase, Typography } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {},
    title: {
      flexGrow: 1,
      textAlign: "left",
      cursor: "pointer",
      fontWeight: "bold",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "55%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());
  // const [token, setToken] = useRecoilState(tokenState);
  useEffect(() => {
    setInterval(() => setCurrTime(new Date().toLocaleTimeString()), 1000);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar variant="dense">
          <Link href="/">
            <IconButton
              color="inherit"
              edge="start"
              className={classes.menuButton}
            >
              <Home />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {currTime}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Tìm mã CK"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
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

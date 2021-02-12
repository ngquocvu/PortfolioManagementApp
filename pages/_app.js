import "../styles/globals.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { RecoilRoot } from "recoil";

import {
  useMediaQuery,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";

function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState(0);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#262626" : "#fafafa",
            paper: prefersDarkMode ? "#343434" : "#fff",
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg" style={{ paddingTop: "2rem" }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;

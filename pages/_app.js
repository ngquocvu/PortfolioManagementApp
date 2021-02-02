import "../styles/globals.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";

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
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Loading />
      <Container maxWidth="lg" style={{ paddingTop: "2rem" }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <LinearProgress />;
}

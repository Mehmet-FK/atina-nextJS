import Layout from "@/layout/Layout";
import store from "@/redux/app/store";
import { SessionProvider, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { Provider } from "react-redux";
import "../styles/global.css";
import Loading from "@/components/Loading";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("light");
  const router = useRouter();
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: blueGrey[600],
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {loading && <Loading />}
        <SessionProvider>
          {router.pathname.includes("login") && <Component {...pageProps} />}
          {!router.pathname.includes("login") && (
            <Layout toggleTheme={toggleTheme}>
              <Component {...pageProps} />
            </Layout>
          )}
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
}

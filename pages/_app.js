import Layout from "@/layout/Layout";
import store from "@/redux/app/store";
import { SessionProvider, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { Provider } from "react-redux";
import "../styles/global.css";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <Provider store={store}>
      {loading && <Loading />}
      <SessionProvider>
        {router.pathname.includes("login") && <Component {...pageProps} />}
        {!router.pathname.includes("login") && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </Provider>
  );
}

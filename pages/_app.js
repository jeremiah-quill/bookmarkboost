import Navbar from "../components/Navbar";

import { AuthProvider } from "../lib/useAuth";
import { SWRConfig } from "swr";
import Head from "next/head";
import Toast from "../components/Toast";

import "../styles/globals.css";
import { ToastProvider } from "../utils/useToast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        {/* <SWRConfig
        value={{
          fetcher: async (...args) => {
            const res = await fetch(...args);
            return res.json();
          },
        }}> */}
        <ToastProvider>
          <Head>
            <title>Bookmark Boost</title>
          </Head>
          {/* <Navbar /> */}
          <div className="bg-slate-200 h-full pt-[83px] overflow-y-scroll">
            {/* <Component {...pageProps} /> */}
            <Component {...pageProps} />
          </div>

          {/* </SWRConfig> */}
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

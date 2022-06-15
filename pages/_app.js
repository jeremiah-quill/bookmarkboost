import Navbar from "../components/Navbar";

import { AuthProvider } from "../lib/useAuth";
import { SWRConfig } from "swr";
import Head from "next/head";
import Toast from "../components/Toast";

import "../styles/globals.css";
import { ToastProvider } from "../utils/useToast";
import Header from "../components/Header";

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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Dongle:wght@300&display=swap"
              rel="stylesheet"
            />
          </Head>
          <div className="h-full pt-[48px] ">
            {/* <Header />
            <div className="grid grid-cols-12 h-full auto-cols-min">
              <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 p-2">
                categories
              </div> */}
            <div className="h-full lg:col-span-10 md:col-span-9 col-span-8">
              <Component {...pageProps} />
            </div>
            {/* </div> */}
          </div>
          {/* </SWRConfig> */}
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

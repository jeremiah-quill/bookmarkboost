import Navbar from "../components/Navbar";

import { AuthProvider } from "../lib/useAuth";
import { SWRConfig } from "swr";
import Head from "next/head";
import Toast from "../components/Toast";

import "../styles/globals.css";
import { ToastProvider } from "../utils/useToast";
import Header from "../components/Header";
import { FolderProvider } from "../utils/useFolder";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <FolderProvider>
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
              <Component {...pageProps} />
            </div>
          </ToastProvider>
        </FolderProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

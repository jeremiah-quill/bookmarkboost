import Head from "next/head";

import { AuthProvider } from "../lib/useAuth";
import { ToastProvider } from "../utils/useToast";
import { ThemeProvider } from "next-themes";
import { FolderProvider } from "../utils/useFolder";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

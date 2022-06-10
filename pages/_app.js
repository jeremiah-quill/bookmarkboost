import Navbar from "../components/Navbar";

import { AuthProvider } from "../lib/useAuth";
import { SWRConfig } from "swr";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const res = await fetch(...args);
            return res.json();
          },
        }}>
        <Navbar />
        <div className="bg-slate-200 h-full pt-[83px] overflow-y-scroll">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </AuthProvider>
  );
}

export default MyApp;

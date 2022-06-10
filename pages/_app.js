import { AuthProvider } from "../lib/useAuth";
import { BookmarkProvider } from "../utils/store";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { supabase } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <BookmarkProvider bookmarks={pageProps.bookmarks}> */}
      <Navbar />
      <div className="bg-slate-200 h-full pt-[83px] overflow-y-scroll">
        <Component {...pageProps} />
      </div>
      {/* </BookmarkProvider> */}
    </AuthProvider>
  );
}

export default MyApp;

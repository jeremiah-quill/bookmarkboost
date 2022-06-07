import { AuthProvider } from "../lib/useAuth";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <div className="bg-slate-200 h-full">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;

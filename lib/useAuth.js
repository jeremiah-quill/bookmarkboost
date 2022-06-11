import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  const router = useRouter();

  const signInWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };

  const signOut = async () => {
    router.push("/");
    return await supabase.auth.signOut();
  };

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    if (session?.user) {
      Cookies.set("bookmark-boost-auth", true, { expires: 1 });
    } else {
      Cookies.remove("bookmark-boost-auth");
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        Cookies.set("bookmark-boost-auth", true, { expires: 1 });
      } else {
        Cookies.remove("bookmark-boost-auth");
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: user ? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    });
  }, [user]);

  return {
    session,
    user,
    signInWithGoogle,
    signOut,
  };
}

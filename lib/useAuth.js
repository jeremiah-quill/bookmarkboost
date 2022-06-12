import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const router = useRouter();

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: "http://localhost:3000/dashboard" }
    );
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user);
    setLoading(false);

    if (session?.user) {
      Cookies.set("bookmark-boost-auth", true, { expires: 1 });
    } else {
      Cookies.remove("bookmark-boost-auth");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);

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

  // useEffect(() => {
  //   if (!loading) {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   }
  // }, [loading]);

  return {
    session,
    user,
    error,
    loading,
    signInWithGoogle,
    signOut,
  };
}

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";
import Cookies from "js-cookie";

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
  const [session, setSession] = useState(null);

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: "https://www.bookmarkboost.app/dashboard" }
    );
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    setTimeout(() => {
      setSession(supabase.auth.session());
      setUser(supabase.auth.user());
      setLoading(false);
    }, 5000);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
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

  return {
    session,
    user,
    loading,
    signInWithGoogle,
    signOut,
  };
}

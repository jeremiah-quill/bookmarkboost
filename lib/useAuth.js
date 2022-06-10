import { Router, useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

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

  const signInWithGoogle = async () => {
    return await supabase.auth.signIn({
      provider: "google",
    });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  useEffect(() => {
    setUser(supabase.auth.user());
    const setUserOnChange = () =>
      supabase.auth.onAuthStateChange(() => {
        const user = supabase.auth.user();
        if (user) {
          setUser(user);
        } else {
          setUser(false);
        }
      });
    return () => setUserOnChange();
  }, []);

  return {
    user,
    signInWithGoogle,
    signOut,
  };
  // return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

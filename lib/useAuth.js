import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
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
    setUser(supabase.auth.currentUser);

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        setUser(session.user);
      }
      if (event == "SIGNED_OUT") {
        setUser(false);
      }
    });
  }, []);

  const auth = {
    user,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

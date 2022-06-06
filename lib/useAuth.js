import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [testUser, setTestUser] = useState(null);
  const signInWithGoogle = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: "google",
    });
    console.log(user);
    setTestUser(user);
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  useEffect(() => {
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
    testUser,
    user,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

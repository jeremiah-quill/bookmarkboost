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
  const [session, setSession] = useState(null);

  const signInWithGoogle = async () => {
    return await supabase.auth.signIn({
      provider: "google",
    });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  // useEffect(() => {
  //   setUser(supabase.auth.user());
  //   supabase.auth.onAuthStateChange(() => {
  //     setUser(supabase.auth.user());
  //   });
  // }, []);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (supabase.auth.user()) {
  //     const token = supabase.auth.currentSession.access_token;
  //     const userObject = { token, ...supabase.auth.user() };
  //     setUser(userObject);
  //   }

  //   const setUserOnChange = () =>
  //     supabase.auth.onAuthStateChange(() => {
  //       const user = supabase.auth.user();
  //       if (user) {
  //         const token = supabase.auth.currentSession.access_token;
  //         const userObject = { token, ...supabase.auth.user() };
  //         setUser(userObject);
  //       } else {
  //         setUser(false);
  //       }
  //     });
  //   return () => setUserOnChange();
  // }, []);

  return {
    session,
    user,
    signInWithGoogle,
    signOut,
  };
}

import { useRouter } from "next/router";
import { useAuth } from "../lib/useAuth";
import { useEffect, useState } from "react";
import LoadingCards from "../components/LoadingCards";
import { supabase } from "../lib/supabase";

// routeProtection.js
// withPublic checks if the user is logged in, if they are... it will reroute to '/account'.
// (ex:) a logged in user tries to access /login; they will be rerouted to /account.
// export const withPublic = (WrappedComponent) => {
//   return (props) => {
//     // const router = useRouter();
//     const { user, session, loading } = useAuth();

//     useEffect(() => {
//       if (user) {
//         router.replace("/dashboard");
//         return;
//       }
//     }, [user]);

//     if (!user || loading) {
//       return <h1>Loading here!</h1>; // full-screen loader here
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// withProtected checks if the user is not logged in, if not it will reroute to '/login'.
// (ex:) a logged out user tries to access /account, they will be rerouted to /login.
export const withProtected = (WrappedComponent, Loader) => {
  return (props) => {
    const router = useRouter();
    const { user, session, loading } = useAuth();

    if (loading) {
      // return <LoadingCards />;
      return <Loader />;
      // return <div>loading...</div>;
    }

    if (!user) {
      router.push("/");
      return;
    }

    return <WrappedComponent {...props} />;
  };
};

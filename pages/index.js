import { useEffect, useContext } from "react";
// import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import { useAuth } from "../lib/useAuth";
import { BookmarkContext, DispatchBookmarkContext } from "../utils/store";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

// * export functionality of gerServerSideProps and use it in store
// export { getServerSideProps } from "../utils/store";
// export async function getStaticProps() {
//   return {
//     props: {
//       user: {},
//     },
//   };
// }

export default function Home() {
  const auth = useAuth();
  // const router = useRouter();
  // useEffect(() => {
  //   if (supabase.auth.user()) {
  //     router.push("/dashboard");
  //   }
  // }, []);
  // const dispatchBookmarks = useContext(DispatchBookmarkContext);

  // useEffect(() => {
  //   if (auth.user) {
  //     const userId = auth.user.id;
  //     const getBookmarks = async () => {
  //       const { data: bookmarks } = await supabase
  //         .from("bookmarks")
  //         .select("*")
  //         .eq("user_id", userId)
  //         .order("id", { ascending: true });
  //       dispatchBookmarks({ type: "SET_BOOKMARKS", bookmarks: bookmarks });
  //     };
  //     getBookmarks();
  //   }
  // }, [auth]);

  return (
    <>
      <div>landing</div>
      <div>
        email: <p>{auth.user?.email}</p>
      </div>
    </>
  );
  // return <>{!auth.user ? <Landing /> : <Dashboard />}</>;
}

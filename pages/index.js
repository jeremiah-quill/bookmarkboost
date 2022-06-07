import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";

// export async function getServerSideProps() {
//   const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

//   if (error) {
//     throw new Error(error);
//   }

//   return {
//     props: {
//       bookmarks,
//     },
//   };
// }

// ! REMEMBER TO UNHIDE getServerSideProps and pass in { bookmarks } as a prop to Home
export default function Home({ bookmarks = [] }) {
  const auth = useAuth();
  // // ! setting user to false for styling
  // auth.user = false;

  return (
    <div className="pt-[98px] p-4">
      {!auth.user ? <Landing /> : <Dashboard bookmarks={bookmarks} />}
    </div>
  );
}

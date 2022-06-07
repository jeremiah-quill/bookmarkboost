import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";

export async function getServerSideProps() {
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      bookmarks,
    },
  };
}

export default function Home({ bookmarks }) {
  const auth = useAuth();
  console.log(bookmarks);

  return (
    <div className="pt-[86px] p-4">
      {!auth.user ? <Landing /> : <Dashboard bookmarks={bookmarks} />}
    </div>
  );
}

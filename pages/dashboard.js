import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../lib/supabase";

export async function getServerSideProps({ req, res }) {
  const { user: serverUser } = await supabase.auth.api.getUserByCookie(req);

  if (!serverUser) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      serverUser: serverUser,
    },
  };
}

export default function DashboardPage({ serverUser }) {
  const fetcher = async (url, id) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", id }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data: bookmarks } = useSWR(
    serverUser ? ["/api/usersBookmarks", serverUser.id] : null,
    fetcher
  );

  if (!bookmarks) return <LoadingCards />;

  return (
    <>
      <div className="h-full">
        <BmList bookmarks={bookmarks} />
      </div>
    </>
  );
}

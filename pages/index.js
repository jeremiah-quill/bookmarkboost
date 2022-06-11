import { useAuth } from "../lib/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../lib/supabase";

export async function getServerSideProps({ req, res }) {
  const { user: serverUser } = await supabase.auth.api.getUserByCookie(req);

  if (serverUser) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const auth = useAuth();

  const router = useRouter();

  if (auth.user) {
    router.push("/dashboard");
  }

  return (
    <>
      <div>Welcome to Bookmark Boost!</div>
    </>
  );
}

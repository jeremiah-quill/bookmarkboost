import { useAuth } from "../lib/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home() {
  const { signInWithGoogle } = useAuth();

  // const signInWithGoogle = async () => {
  //   const { user, session, error } = await supabase.auth.signIn(
  //     {
  //       provider: "google",
  //     },
  //     { redirectTo: "http://localhost:3000/dashboard" }
  //   );
  // };

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('bookmark-boost-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
      </Head>
      <div className="h-full flex items-center justify-center">
        <div>
          <h1 className="text-center">Welcome to Bookmark Boost</h1>

          {user ? (
            <Link href="/dashboard">
              <a className="m-auto block px-2 py-1 bg-black text-white rounded-md">Dashboard </a>
            </Link>
          ) : (
            <button
              className="m-auto block px-2 py-1 bg-black text-white rounded-md"
              onClick={signInWithGoogle}>
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

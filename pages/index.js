import { useAuth } from "../lib/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../lib/supabase";

export default function Home() {
  const { user } = useAuth();

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

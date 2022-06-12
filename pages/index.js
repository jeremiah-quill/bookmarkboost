import { useAuth } from "../lib/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const { signInWithGoogle } = useAuth();

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
          <button
            className="m-auto block px-2 py-1 bg-black text-white rounded-md"
            onClick={signInWithGoogle}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

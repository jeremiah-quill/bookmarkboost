import { useAuth } from "../lib/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const auth = useAuth();

  const router = useRouter();

  if (auth.user) {
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        {/* <title>Bookmark Boost</title> */}
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
      <div>Welcome to Bookmark Boost!</div>
    </>
  );
}

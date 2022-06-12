import { useAuth } from "../lib/useAuth.js";
import { useMemo } from "react";
import BmQuickAdd from "./BmQuickAdd";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { useRouter } from "next/router";

const Navbar = () => {
  const { signInWithGoogle, user, signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    return router.push("/");
  };

  return (
    <nav className="bg-white flex fixed top-0 w-full p-5 items-center z-10">
      <Link href="/">
        <a>
          <img src="/bb_svg.svg" alt="logo" />
        </a>
      </Link>
      <Link className="" href="/dashboard">
        <a className="mx-5">Dashboard</a>
      </Link>
      <BmQuickAdd />
      <div className="ml-auto">
        {!user ? (
          <button
            className="bg-slate-800 rounded-md py-1 px-2 text-white"
            onClick={signInWithGoogle}>
            Login
          </button>
        ) : (
          <div className="flex gap-2 items-center">
            <h2 className="text-xs h-[16px]">{user.email}</h2>
            <button
              className="bg-slate-800 rounded-md py-1 px-2 text-white"
              onClick={handleSignOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

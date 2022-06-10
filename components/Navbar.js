import { useAuth } from "../lib/useAuth.js";
import { useMemo } from "react";
import BmQuickAdd from "./BmQuickAdd";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { signInWithGoogle, user, signOut } = useAuth();

  const memoizedEmail = useMemo(() => {
    if (user) {
      let sliced = user.email.slice(0, user.email.length - 4);
      return sliced;
    } else {
      return "Searching...";
    }
  }, [user]);

  return (
    <nav className="bg-white flex justify-between fixed top-0 w-full p-5 items-center z-10">
      <Link href="/">
        <a>
          <img src="/bb_svg.svg" alt="logo" />
        </a>
      </Link>
      <BmQuickAdd />
      {/* <ThemeSwitcher /> */}
      <div>
        {!user ? (
          <button onClick={() => signInWithGoogle()}>Login</button>
        ) : (
          <div className="flex gap-2 items-center">
            <h2 className="text-xs">{memoizedEmail}</h2>
            <button
              className="bg-slate-800 rounded-md py-1 px-2 text-white"
              onClick={() => signOut()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

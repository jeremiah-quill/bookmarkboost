import { useAuth } from "../lib/useAuth.js";
import BmQuickAdd from "./BmQuickAdd";
import Link from "next/link";
import { useRouter } from "next/router";
import Toast from "./Toast.js";

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    return router.push("/");
  };

  return (
    <nav className="bg-white flex fixed top-0 w-full px-5 py-2 items-center z-10 border-b border-slate-400">
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
        <div className="flex gap-2 items-center">
          <h2 className="text-xs h-[16px]">{user.email}</h2>
          <button className="bg-slate-800 rounded-md py-1 px-2 text-white" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      </div>

      <Toast />
    </nav>
  );
};

export default Navbar;

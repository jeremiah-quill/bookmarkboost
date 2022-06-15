import { useAuth } from "../lib/useAuth.js";
import BmQuickAdd from "./BmQuickAdd";
import Link from "next/link";
import { useRouter } from "next/router";
import Toast from "./Toast.js";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [settingsMenu, setSettingsMenu] = useState(false);

  console.log(user);

  const handleSignOut = () => {
    setSettingsMenu(false);
    signOut();
    return router.push("/");
  };

  return (
    <nav className="px-5 text-xl flex fixed top-0 w-full items-center z-10 border-b border-slate-200">
      <Link href="/">
        {/* <a><img src="/bb_svg.svg" alt="logo" /></a> */}
        <a>
          <h1 className="py-2 font-bold text-2xl w-[180px] border-r border-slate-200">
            {" "}
            Bookmark Boost
          </h1>
        </a>
      </Link>
      <Link className="" href="/dashboard">
        <a className="mx-5">Dashboard</a>
      </Link>
      <BmQuickAdd />
      <div className="ml-auto relative">
        <button className="" onClick={() => setSettingsMenu((curr) => !curr)}>
          <img className="rounded-full w-7 inline" src={user.user_metadata.picture} />
        </button>
        {!settingsMenu ? null : (
          <nav className="absolute -left-10 bg-white border border-slate-200 mt-2 rounded-md">
            <ul>
              <button onClick={handleSignOut}>
                <li className="hover:bg-gray-300 px-2 rounded-md transition-all">Logout</li>
              </button>
            </ul>
          </nav>
        )}
      </div>
      <Toast />
    </nav>
  );
};

export default Navbar;

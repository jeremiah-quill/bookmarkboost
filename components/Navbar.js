import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useAuth } from "../lib/useAuth.js";

import BmQuickAdd from "./BmQuickAdd";
import Toast from "./Toast.js";

const Navbar = ({ updateBmUi }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [settingsMenu, setSettingsMenu] = useState(false);

  const { session } = useAuth();

  const handleSignOut = () => {
    setSettingsMenu(false);
    signOut();
    return router.push("/");
  };

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data: folders } = useSWR(
    !session ? null : ["/api/usersFolders", session.access_token],
    fetcher
  );

  if (!folders) return "loading...";

  return (
    <div className="flex items-center w-full justify-between">
      <nav>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
      </nav>
      <BmQuickAdd folders={folders} updateBmUi={updateBmUi} />
      <div className="relative">
        <button className="" onClick={() => setSettingsMenu((curr) => !curr)}>
          <img className="rounded-full w-7 inline" src={user?.user_metadata?.picture} />
        </button>
        {!settingsMenu ? null : (
          <nav className="absolute -left-10 bg-white border border-slate-200 mt-2 rounded-md z-50">
            <ul>
              <button onClick={handleSignOut}>
                <li className="hover:bg-gray-300 px-2 rounded-md transition-all">Logout</li>
              </button>
            </ul>
          </nav>
        )}
      </div>
      <Toast />
    </div>
  );
};

export default Navbar;

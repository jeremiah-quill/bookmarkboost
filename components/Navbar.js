import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../lib/useAuth.js";

import BmQuickAdd from "./BmQuickAdd";
import Toast from "./Toast.js";

const Navbar = ({ toolbar = true }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [settingsMenu, setSettingsMenu] = useState(false);

  const handleSignOut = () => {
    setSettingsMenu(false);
    signOut();
    return router.push("/");
  };

  return (
    <div className="flex items-center w-full justify-between">
      {!!toolbar && <BmQuickAdd />}
      <div className="relative ml-auto">
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

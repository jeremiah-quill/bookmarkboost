import Link from "next/link";

import Navbar from "./Navbar";

const Header = ({ toolbar }) => {
  return (
    <header className="grid grid-cols-12 auto-cols-min fixed top-0 w-full border-b border-slate-200 dark:border-[#282828] z-50 bg-[#fafafa] dark:bg-[#1c1c1c] border-">
      <div className="lg:col-span-2 md:col-span-3 col-span-4">
        <Link href="/dashboard">
          <a className="">
            <h1 className="p-2 font-bold text-2xl border-r border-slate-200 dark:border-[#282828] dark:text-[#ededed]">
              {" "}
              Bookmark Boost
            </h1>
          </a>
        </Link>
      </div>
      <div className="lg:col-span-10 md:col-span-9 col-span-8 p-2 flex">
        <Navbar toolbar={toolbar} />
      </div>
    </header>
  );
};

export default Header;

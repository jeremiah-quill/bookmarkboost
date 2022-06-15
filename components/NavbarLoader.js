import BmQuickAdd from "./BmQuickAdd";

const NavbarLoader = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <nav>
        <div>Dashboard</div>
      </nav>
      <BmQuickAdd />
      <div className="relative">
        <img className="rounded-full bg-gray-400 animate-pulse w-7 h-7" />
      </div>
    </div>
  );
};

export default NavbarLoader;

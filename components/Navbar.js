import { useAuth } from "../lib/useAuth.js";

const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className="bg-white flex justify-between fixed top-0 w-full p-5 items-center shadow-md">
      <h1 className="text-2xl">BB</h1>
      {!auth.user ? (
        <button onClick={() => auth.signInWithGoogle()}>Login</button>
      ) : (
        <div className="flex gap-2 items-center">
          <h2 className="text-sm">{auth.user.email}</h2>
          <button
            className="bg-slate-800 rounded-md py-1 px-2 text-white"
            onClick={() => auth.signOut()}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

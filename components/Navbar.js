import { useAuth } from "../lib/useAuth.js";

const Navbar = () => {
  const auth = useAuth();
  console.log(auth);
  return (
    <nav>
      <h1>Bookmark Boost</h1>
      {!auth.user ? (
        <button onClick={() => auth.signInWithGoogle()}>Login</button>
      ) : (
        <div>
          <h2>{auth.user.email}</h2>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

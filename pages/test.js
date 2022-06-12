import { useAuth } from "../lib/useAuth";

const test = () => {
  const auth = useAuth();

  return (
    <div>
      <button onClick={() => auth.signInWithGoogle()}>Sign in</button>
    </div>
  );
};

export default test;

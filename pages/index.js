import { useAuth } from "../lib/useAuth";

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <div>landing</div>
      <div>
        email: <p>{auth.user?.email}</p>
      </div>
    </>
  );
}

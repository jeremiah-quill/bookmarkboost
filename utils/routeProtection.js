import { useRouter } from "next/router";
import { useAuth } from "../lib/useAuth";

import LoaderShell from "../components/LoaderShell";

export const withProtected = (WrappedComponent, Loader) => {
  return (props) => {
    const router = useRouter();
    const { user, session, loading } = useAuth();

    if (loading) {
      return (
        <LoaderShell>
          <Loader />
        </LoaderShell>
      );
    }

    if (!user) {
      router.push("/");
      return;
    }

    return <WrappedComponent {...props} />;
  };
};

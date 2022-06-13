import { useAuth } from "../lib/useAuth";
import { withProtected } from "../utils/routeProtection";

const test2 = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <div>Protected Route</div>
    </div>
  );
};

export default withProtected(test2);

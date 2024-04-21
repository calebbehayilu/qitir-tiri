import { useState } from "react";
import { useAuth } from "../utils/auth-provider";

const GoogleSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const { GoogleLogin } = useAuth();

  async function googleFunction() {
    setIsLoading(true);
    const res = await GoogleLogin();
    setUser(res);
  }

  return (
    <button
      className="btn btn-outline w-full"
      disabled={isLoading}
      onClick={googleFunction}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>Sign In With Google</>
      )}
    </button>
  );
};

export default GoogleSignin;

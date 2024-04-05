import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "./../utils/firebase";
import axios from "axios";

const GoogleSignin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (name, email, uid, photoURL) => {
    const post = await axios.post(
      "http://localhost:3000/user/signUp-with-google",
      {
        name: name,
        email: email,
        uid: uid,
        photoURL: photoURL,
      }
    );

    return post;
  };

  useEffect(() => {
    setIsLoading(true);
    getRedirectResult(auth)
      .then(async (response) => {
        if (!response) return;

        const res = await signUp(
          response.user.displayName,
          response.user.email,
          response.user.uid,
          response.user.photoURL
        );

        if (res.status == 200) {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          window.location = "/home";
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const GoogleLogin = async () => {
    await signInWithRedirect(auth, provider).catch((error) => {
      console.error(error);
    });
  };

  return (
    <button
      className="btn btn-outline w-full"
      disabled={isLoading}
      onClick={GoogleLogin}
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

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "./firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
const url = import.meta.env.VITE_APP_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  async function signUp(user) {
    const post = await axios
      .post(`${url}/user`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("user-info", JSON.stringify(res.data));
          setUser(res.data);
          window.location = "/home";
        }
      })
      .catch((err) => {
        return err;
      });

    return post;
  }

  async function login(user) {
    const post = await axios
      .post(`${url}/auth`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("user-info", JSON.stringify(res.data));
          setUser(res.data);
          window.location = "/home";
        }
      })
      .catch((err) => {
        return err;
      });

    return post;
  }

  const signupWithGoogle = async (name, email, uid, photoURL) => {
    const post = await axios.post(`${url}/user/signUp-with-google`, {
      name: name,
      email: email,
      uid: uid,
      photoURL: photoURL,
    });

    return post;
  };

  const GoogleLogin = async () => {
    await signInWithRedirect(auth, provider)
      .catch((error) => {
        console.error(error);
      })
      .finally((res) => {
        return res;
      });
  };

  function logout() {
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("user-info");
    window.location = "/login";
  }
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (response) => {
        if (!response) return;

        const res = await signupWithGoogle(
          response.user.displayName,
          response.user.email,
          response.user.uid,
          response.user.photoURL
        ).then((res) => {
          if (res.status == 200) {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.setItem("user-info", JSON.stringify(res.data));
            setUser(res.data);
            window.location = "/home";
          }
        });
      })

      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, GoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

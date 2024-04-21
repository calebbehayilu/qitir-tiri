import React, { useState } from "react";
import Error from "../components/error";
import GoogleSignin from "../components/google-signup";
import { useAuth } from "../utils/auth-provider";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    caught: false,
    cause: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password == "" || user.email == "")
      return setError((prev) => ({
        caught: true,
        cause: "Can`t leave the text fileds empty!",
      }));

    setIsLoading(true);
    const res = await login(user);

    if (res.response.status !== 200) {
      setIsLoading(false);

      return setError((prev) => ({
        caught: true,
        cause: res.response.data,
      }));
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen py-16">
      <div className="min-w-fit">
        <h1 className=" text-center text-2xl m-2">Login</h1>
        <form className="flex flex-col w-96 gap-2 " onSubmit={handleSubmit}>
          {error.caught && <Error error={error.cause} />}

          <label className="input input-bordered flex items-center gap-2">
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>

          <button
            className="btn btn-primary text-white btn-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>Login</>
            )}
          </button>
        </form>
        <span className="divider "></span>

        <GoogleSignin />
      </div>
    </div>
  );
};

export default Login;

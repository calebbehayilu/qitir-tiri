import React, { useState } from "react";
import Error from "../components/error";
import GoogleSignin from "../components/google-signup";
import { login } from "../utils/auth.util";

const Login = () => {
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

    const res = await login(user);
    // console.log("login ", res.response.data);

    if (res.response.status !== 200) {
      return setError((prev) => ({
        caught: true,
        cause: res.response.data,
      }));
    }
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

          <button className="btn btn-primary text-white mt-3" type="submit">
            Login
          </button>
        </form>
        <span className="divider "></span>

        <GoogleSignin />
      </div>
    </div>
  );
};

export default Login;

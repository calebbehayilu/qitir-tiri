import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState(false);
  const signUp = async (user) => {
    const post = await axios.post("http://localhost:3000/user", {
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return post;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) return setError(true);

    const response = await signUp(user);

    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/home";
    }
  };

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="py-16">
      <div className="flex flex-col justify-center items-center m-5">
        <h1 className="text-2xl m-2">Sign Up</h1>
        <form className="flex flex-col w-96 gap-2" onSubmit={handleSubmit}>
          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Password not same.</span>
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="Name"
            />
          </label>
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
          <label className="input input-bordered flex items-center gap-2">
            <IoKey />
            <input
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleChange}
              type="password"
              className="grow"
              placeholder="Confirm Password"
            />
          </label>

          <button className="btn btn-primary text-white mt-3" type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

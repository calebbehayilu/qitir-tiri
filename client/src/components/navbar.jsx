import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../utils/auth.util";
import useFetch from "../utils/useFetch";
import axios from "axios";

const Navbar = ({ user }) => {
  const { error, isPending, data } = useFetch("http://localhost:3000/user/me");
  return (
    <nav className="navbar p-3">
      <div className=" flex-1 navbar-start">
        <h1>
          <NavLink to={"/"} className="btn btn-ghost text-2xl">
            Qitir Tiri 📰
          </NavLink>
        </h1>
      </div>

      {!user ? (
        <ul className="flex gap-3 nav-end">
          <li>
            <NavLink to={"/login"} className="btn btn-primary btm-nav-sm">
              LogIn
            </NavLink>
          </li>
          <li>
            <NavLink to={"/sign-up"} className="btn btn-outline btm-nav-sm">
              Create Account
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {data && (
                <img alt="Tailwind CSS Navbar component" src={data.photoURL} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={"/settings"}>Settings</Link>
            </li>
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

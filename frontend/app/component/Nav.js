"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Nav = () => {
  const { logOut, user } = useAuth();

  // logout function
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-base-100 border border-base-300 rounded-lg shadow-2xl",
        title: "text-base-content text-2xl font-bold",
        htmlContainer: "text-base-content",
        confirmButton:
          "bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 mr-2",
        cancelButton:
          "bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      logOut();
    }
  };

  // links of navbar
  const links = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/courses">All Courses</Link>
      </li>

      {user &&
      (user.role?.name === "SocialMediaManager" || user.role?.name === "Admin") ? (
        <>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </>
      ) : null}

      <li>
        <Link href="/about">About Us</Link>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar px-5 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost  ">
            CPS Academy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-3">
          {user ? (
            <button onClick={handleLogout} className="btn bg-black text-white">
              Logout
            </button>
          ) : (
            <>
              <Link className="btn " href="/login">
                Login
              </Link>
              <Link className="btn bg-black text-white" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;

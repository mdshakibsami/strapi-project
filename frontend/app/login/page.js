"use client";
import Image from "next/image";
import React from "react";
import signUpImage from "@/public/login.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { logIn } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const identifier = e.target.identifier.value;
    const password = e.target.password.value;
    console.log(identifier, password);

    const res = await logIn(identifier, password);

    console.log(res);
    if (res.success) {
      await Swal.fire({
        title: "Success!",
        text: "Logged in successfully",
        icon: "success",
        confirmButtonText: "Continue",
        customClass: {
          popup: "bg-base-100 border border-base-300 rounded-lg shadow-2xl",
          title: "text-success text-2xl font-bold",
          htmlContainer: "text-base-content",
          confirmButton:
            "bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800",
        },
        buttonsStyling: false,
      });
      router.push("/");
    } else {
      await Swal.fire({
        title: "Login Failed!",
        text: "Invalid Email/Username or password",
        icon: "error",
        confirmButtonText: "Try Again",
        customClass: {
          popup: "bg-base-100 border border-error rounded-lg shadow-2xl",
          title: "text-error text-2xl font-bold",
          htmlContainer: "text-base-content",
          confirmButton:
            "bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800",
        },
        buttonsStyling: false,
      });
    }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Image src={signUpImage} alt="sign up"></Image>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl font-bold text-center mt-5">Login</h1>
            <div className="card-body">
              <form onSubmit={handleLogin} className="fieldset">
                <label className="label">Email or Username</label>
                <input
                  name="identifier"
                  className="input"
                  placeholder="Email or Username"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <div>
                  <Link href="login/forgetPassword" className="link link-hover">
                    Forgot password?
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

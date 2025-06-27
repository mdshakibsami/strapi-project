"use client";
import Image from "next/image";
import React, { useState } from "react";
import signUpImage from "@/public/signup.svg";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(username, email, password);

    const result = await signIn(username, email, password);
    // console.log(result);
    if (result.success) {
      await Swal.fire({
        title: "Success!",
        text: "Registered successfully!",
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
      // console.log("User data:", data);
      router.push("/");
    } else {
      // Error alert
      await Swal.fire({
        title: "Registration Failed!",
        text: result.message || "Registration failed. Please try again.",
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
            <h1 className="text-3xl font-bold text-center mt-5">
              Register Here
            </h1>
            <div className="card-body">
              <form onSubmit={handleRegister} className="fieldset">
                <label className="label">Username</label>
                <input
                  type="username"
                  className="input"
                  placeholder="Username"
                  name="username"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <button className="btn btn-neutral mt-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";
import Image from "next/image";
import React from "react";
import signUpImage from "@/public/login.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
    const router = useRouter()
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);

    const result = await fetch(
      "http://localhost:1337/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await result.json();

    if (result.ok) {
      Swal.fire("Success!", "Password reset email has been sent!", "success");
      router.push('/login/changePassword')
    } else {
      Swal.fire(
        "Error",
        data?.error?.message || "Something went wrong",
        "error"
      );
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
              Give Your Email
            </h1>
            <div className="card-body">
              <form onSubmit={handleForgetPassword} className="fieldset">
                <label className="label">Enter Your Email</label>
                <input name="email" type="email" className="input" placeholder="Email " />
                <button className="btn btn-neutral mt-4">Send Code</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

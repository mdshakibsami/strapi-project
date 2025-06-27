"use client";
import Image from "next/image";
import React from "react";
import signUpImage from "@/public/login.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(code, password, confirmPassword);

    if (password !== confirmPassword) {
      return await Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
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

    const result = await fetch(
      "http://127.0.0.1:1337/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          password,
          passwordConfirmation: confirmPassword,
        }),
      }
    );

    const data = await result.json();

    if (result.ok) {
      await Swal.fire({
        title: "Success!",
        text: "Password has been reset successfully",
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
      router.push("/login");
    } else {
      await Swal.fire({
        title: "Reset Failed!",
        text: data?.error?.message || "Invalid code or reset failed",
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
              Give These Information
            </h1>
            <div className="card-body">
              <form onSubmit={handleChangePassword} className="fieldset">
                <label className="label">Enter Your Code</label>
                <input name="code" className="input" placeholder="Code " />

                <label className="label">Enter Your Password</label>
                <input
                  name="password"
                  className="input"
                  placeholder="Password "
                />

                <label className="label">Enter Your Confirm Password</label>
                <input
                  name="confirmPassword"
                  className="input"
                  placeholder="Confirm Password "
                />
                <button className="btn btn-neutral mt-4">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

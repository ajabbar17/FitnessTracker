"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = ({ onLoginClick }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <form className="px-7 h-screen w-auto grid justify-center items-center">
        <div
          className="grid gap-4 shadow-md w-auto  shadow-slate-400 hover:scale-105 transition-all transform rounded p-6"
          id="form"
        >
          <h2 className="text-black text-3xl i text-center font-bold ">
            Sign Up
          </h2>

          <div className="w-full flex gap-3">
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="grid gap-6 w-full">
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Date Of Birth"
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="shadow-md text-sm p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-slate-300 rounded border-2 placeholder:text-gray-500"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="outline-none glass shadow-lg rounded w-full p-3 bg-black text-white hover:bg-slate-600 hover:border-solid font-bold"
            type="submit"
          >
            Submit
          </button>
          <p className="text-gray-500 text-center">
            Already have an account ?{" "}
            <Link
              href="/auth/login"
              className="hover:underline font-bold text-black"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";

const Login = ({ onSignupClick, onLoginSuccessfull }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//   const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div className="flex justify-center items-center px-7 h-screen bg-white ">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white border shadow-lg hover:scale-105 transition-all transform shadow-slate-500 rounded">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl text-black font-bold sm:text-3xl">LOGIN</h1>

          <p className="mt-4 text-white">
            Provide Your Login Credentials To Move Forward
          </p>
        </div>

        <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded text-black focus:outline-none border-2 border-slate-300 focus:bg-zinc-100 shadow-slate-400 bg-white p-4 pe-12 text-sm"
                placeholder="Enter email"
                onChange={(e) => {setemail(e.target.value)}}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded  text-black  border-2 border-slate-300 shadow-slate-400 focus:bg-zinc-100 focus:outline-none bg-white p-4 pe-12 text-sm"
                placeholder="Enter password"
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />

              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4  items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-slate-600 hover:scale-105 w-full text-white font-bold py-2 px-10 transition duration-300 rounded"
            >
              Log in
            </button>
            <p className='text-gray-500'>Don't have an account ? <Link  href="/auth/signup" className="hover:underline underline text-black font-bold cursor-pointer">SignUp</Link></p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;

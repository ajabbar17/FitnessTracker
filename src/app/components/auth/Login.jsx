"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation"; // App router for navigation

const Login = ({ onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        { email, password },
        { withCredentials: true } // Sends cookies
      );
      const { accessToken, userId } = response.data;
      console.log(userId);
      localStorage.setItem("userId", userId);

      // Store token in localStorage or cookies (for client-side use)
      localStorage.setItem("token", accessToken);

      // Navigate to dashboard or specific page
      router.push("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-7 h-screen bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white border shadow-lg hover:scale-105 transition-all transform shadow-slate-500 rounded">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl text-black font-bold sm:text-3xl">LOGIN</h1>
          <p className="mt-4 text-black">
            Provide Your Login Credentials To Move Forward
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded text-black focus:outline-none border-2 border-slate-300 focus:bg-zinc-100 shadow-slate-400 bg-white p-4 pe-12 text-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full rounded text-black border-2 border-slate-300 shadow-slate-400 focus:bg-zinc-100 focus:outline-none bg-white p-4 pe-12 text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {/* Password visibility icon */}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-slate-600 hover:scale-105 w-full text-white font-bold py-2 px-10 transition duration-300 rounded"
            >
              Log in
            </button>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="hover:underline underline text-black font-bold cursor-pointer"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

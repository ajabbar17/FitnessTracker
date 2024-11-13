"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold">
              FITNESS
            </Link>
          </div>
          <div className="hidden md:flex ml-32 space-x-4">
            <Link href="/dashboard" className="text-black font-bold hover:text-gray-700">
              Dashboard
            </Link>
            <Link href="/workouts" className="text-black font-bold hover:text-gray-700">
              Workouts
            </Link>
            <Link href="/tutorials" className="text-black font-bold hover:text-gray-700">
              Tutorials
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/auth/login" className="text-gray-700 text-center hover:bg-slate-200 rounded transition-colors  px-7 py-2  font-bold hover:text-black">
              LOG IN
            </Link>
            <Link href="/auth/signup" className="bg-black font-bold text-white px-8 py-2 rounded">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <AiOutlineClose
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/dashboard" className="text-black font-bold hover:text-gray-700" onClick={toggleSidebar}>
            Dashboard
          </Link>
          <Link href="/workouts" className="text-black font-bold hover:text-gray-700" onClick={toggleSidebar}>
            Workouts
          </Link>
          <Link href="/tutorials" className="text-black font-bold hover:text-gray-700" onClick={toggleSidebar}>
            Tutorials
          </Link>
          <Link href="/auth/login" className="text-gray-700 font-bold text-center hover:bg-slate-200 rounded transition-colors  px-4 py-2 bg-slate-100 hover:text-black" onClick={toggleSidebar}>
            LOG IN
          </Link>
          <Link href="/auth/signup" className="bg-black text-white font-bold px-4 py-2 rounded text-center" onClick={toggleSidebar}>
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Background overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;

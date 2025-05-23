"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./logout";

type User = {
  name: string;
};

export default function Navbar({ user }: { user?: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[60px] w-screen bg-teal-500 px-28 max-sm:px-5 flex items-center justify-between text-white shadow-md fixed z-50">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          alt="logo-blog"
          src={"/logo.png"}
          width={100}
          height={100}
          className="h-8 w-8"
          priority
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap">
          Blogger
        </span>
      </Link>

      {/* Burger icon mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-5 items-center">
        {user ? (
          <>
            <p>{user.name}</p>
            <Link href="/create" className="bg-white text-black border px-3 rounded-xl text-sm hover:bg-gray-100">Create</Link>
            <Logout />
          </>
        ) : (
          <div className="flex gap-5">
            <Link href="/login" className="bg-orange-700 px-3 py-2 rounded-lg text-sm hover:bg-orange-800">Login</Link>
            <Link href="/register" className="bg-white text-black border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">Register</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black p-4 flex flex-col gap-2 md:hidden">
          {user ? (
            <>
              <p>{user.name}</p>
              <Link href="/create" className="bg-white text-black border px-3 rounded-xl text-sm hover:bg-gray-100">Create</Link>
              <Logout />
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" className="bg-orange-700 px-3 py-2 rounded-lg text-white text-sm hover:bg-orange-800">Login</Link>
              <Link href="/register" className="bg-white text-black border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

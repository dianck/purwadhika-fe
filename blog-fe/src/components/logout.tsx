"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/login" })}
      className="bg-teal-600 text-white px-2 text-sm rounded-3xl"
    >
      Logout
    </button>
  );
}

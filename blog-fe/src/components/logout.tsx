"use client"

import { signOut } from "next-auth/react"

export default function Logout(){
    return(
        <button 
            onClick={ () => signOut({ redirectTo: "/login"}) }
            className="px-2  bg-gray-600 text-white text-sm rounded-xl cursor-pointer"
        >
            Logout
        </button>
    )
}
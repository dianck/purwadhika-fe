import FormLogin from "@/components/login/form";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login Page",
}

export default function Page(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[250px]">
                <h2 className="text-2xl font-bold text-start mb-5">Sign In</h2>
                <FormLogin />
            </div>

            <p></p>
        </div>
    )
}


import FormRegister from "@/components/register/form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register Page",
    description: "Register Page",
}

export default function Page(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="md:w-[30%] w-[30%]">.
                <h2 className="text-2xl font-bold text-start mb-5">Sign Up</h2>
                <FormRegister />
            </div>

            <p></p>
        </div>
    )
}


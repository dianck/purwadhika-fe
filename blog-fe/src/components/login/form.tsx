"use client"

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
    login: yup.string().required("Login is required"),
    password: yup
        .string()
        .required("password is required")
        .min(6, "password must be at least 6 characters"),   
});


interface ILoginForm{
    login: string;
    password: string;
}

export default function FormLogin(){
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // skip render saat SSR
    
    const initialValues: ILoginForm = {
        login: '',
        password: '',
    };

    const onLogin = async(
        value: ILoginForm,
        actions: FormikHelpers<ILoginForm>
    ) => {
        try{
            const {data} = await axios.post("/users/login", value);
            // console.log(data);
            
            await signIn("credentials", {
                redirectTo: "/",
                objectId: data.objectId,
                email: data.name,
                name: data.name,
                userToken: data["user-token"],
            });

            // actions.setSubmitting(false)
            // toast.success("Login Success");
            // actions.resetForm();

        } catch(err){
            console.log(err);
            actions.setSubmitting(false);
            if(err instanceof AxiosError){
                toast.error(err.response?.data?.message || "Login Failed");
            }
            
        }
    };
    

    return(
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values, action) => {
                    // console.log(values);
                    // action.resetForm();
                    onLogin(values, action);
                }}
            >
                {(props: FormikProps<ILoginForm>) => {
                    const {touched, errors, isSubmitting} = props;
                    return(
                       <Form>
                            <div className=" flex flex-col">
                                <label htmlFor="login" className="text-md">Email</label>
                                <Field 
                                    name="login" 
                                    type="text" 
                                    className="mt-2 mb-2 p-2 border border-gray-600 rounded-md" 
                                    suppressHydrationWarning
                                />
                                {(touched.login && errors.login) && (
                                    <div className="text-red-500 text-[12px]">{errors.login}</div>
                                )}
                            </div>



                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-md mt-5">Password</label>
                                <Field 
                                    name="password" 
                                    type="password" 
                                    className="mt-2 mb-2 p-2 border border-gray-600 rounded-md" 
                                    suppressHydrationWarning 
                                />
                                {(touched.password && errors.password) && (
                                    <div className="text-red-500 text-[12px]">{errors.password}</div>
                                )}
                            </div>

                            <div className="mt-12">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="px-2 py-1 w-full bg-gray-600 text-white text-sm rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {!mounted || !isSubmitting ? "Login" : "Loading..."}
                                </button>
                            </div>
                       </Form> 
                    )
                }}
            </Formik>
        </div>
    )
}
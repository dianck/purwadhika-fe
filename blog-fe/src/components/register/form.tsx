"use client"

import axios from "@/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const RegisterSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
        .string()
        .required("email is required")
        .email("invalid email format"),
    password: yup
        .string()
        .required("password is required")
        .min(6, "password must be at least 6 characters"),   
});



interface IRegisterForm{
    name: string;
    email: string;
    password: string;
}

export default function FormRegister(){
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // skip render saat SSR
    
    const initialValues: IRegisterForm = {
        name: '',
        email: '',
        password: '',
    };

    const onRegister = async(
        value: IRegisterForm,
        actions: FormikHelpers<IRegisterForm>
    ) => {
        try{
            await axios.post("/users/register", value);
            toast.success("Register Success");
            actions.resetForm();

        } catch(err){
            console.log(err);
            actions.setSubmitting(false);
            toast.error("Register Failed");
        }
    };
    

    return(
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={(values, action) => {
                    // console.log(values);
                    // action.resetForm();
                    onRegister(values, action);
                }}
            >
                {(props: FormikProps<IRegisterForm>) => {
                    const {touched, errors, isSubmitting} = props;
                    return(
                       <Form>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-md">Name</label>
                                <Field 
                                    name="name" 
                                    type="text" 
                                    className="mt-2 mb-2 p-2 border border-gray-600 rounded-md" 
                                    suppressHydrationWarning
                                />
                                {(touched.name && errors.name) && (
                                    <div className="text-red-500 text-[12px]">{errors.name}</div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-md mt-5">Email</label>
                                <Field 
                                    name="email" 
                                    type="email" 
                                    className="mt-2 mb-2 p-2 border border-gray-600 rounded-md" 
                                    suppressHydrationWarning
                                />
                                {(touched.email && errors.email) && (
                                    <div className="text-red-500 text-[12px]">{errors.email}</div>
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
                                    {!mounted || !isSubmitting ? "Sign Up" : "Loading..."}
                                </button>
                            </div>
                       </Form> 
                    )
                }}
            </Formik>
        </div>
    )
}
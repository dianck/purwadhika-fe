"use client";

import axios from "@/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup
    .string()
    .required("email is required")
    .email("invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 character"),
});

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function FormRegister() {
  const initialValues: IRegisterForm = {
    username: "",
    email: "",
    password: "",
  };

  const onRegister = async (
    value: IRegisterForm,
    action: FormikHelpers<IRegisterForm>
  ) => {
    try {
      // await axios.post("/users/register", value);
      await axios.post("/auth/register", value);
      toast.success("Register successfully");
      action.resetForm();
    } catch (err) {
      console.log(err);
      action.setSubmitting(false);
      toast.error("Register failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, action) => {
          onRegister(values, action);
        }}
      >
        {(props: FormikProps<IRegisterForm>) => {
          const { touched, errors, isSubmitting } = props;
          return (
            <Form>
              <div className="flex flex-col">
                <label htmlFor="name" className="text-md">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {touched.username && errors.username && (
                  <div className="text-red-500 text-[12px]">{errors.username}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-md">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-[12px]">{errors.email}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-2 mb-1 p-2 border border-gray-600 rounded-md"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-[12px]">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-1 px-2 w-full bg-gray-600 text-white tsxt-sm rounded-md disabled:bg-gray-400"
                >
                  {isSubmitting ? "Loading ..." : "Sign up"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

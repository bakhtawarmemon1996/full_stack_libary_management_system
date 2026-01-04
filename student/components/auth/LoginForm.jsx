"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../Common/Button";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password address is required";
  }

  return errors;
};

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    setShowPass((prev) => !prev);
    console.log(showPass);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      router.push("/");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-[80%] max-w-[600px] flex flex-col items-start justify-center gap-6 py-20"
    >
      <Image
        src={"/logo.png"}
        width={172}
        height={32}
        className=""
        alt="logo"
      />
      <h1 className="text-[28px] font-semibold leading-8 m-0">
        Welcome Back to the BookWise
      </h1>
      <p className="text-lg leading-6 secondary-text">
        Access the vast collection of resources, and stay updated
      </p>

      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="email" className="secondary-text">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="adrian@jsmastery.pro"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="secondary-text">
          Password
        </label>
        <div className="w-full bg-[#232839] p-3 flex items-center justify-between gap-1.5 rounded-md">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="secondary-text w-full outline-none bg-transparent"
            placeholder="Atleast 8 characters long"
          />
          <button type="button" onClick={() => togglePassword()}>
            {showPass ? (
              <FaRegEye className="secondary-text text-base" />
            ) : (
              <FaRegEyeSlash className="secondary-text text-base" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-sm text-red-600">{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="w-full flex justify-end">
        <Link href={`/login`} className="secondary-text text-sm font-medium">
          Forgot Password?
        </Link>
      </div>

      <div className="w-full">
        <Button text={"Login"} type={"submit"} loading={loading} />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Don’t have an account already?{" "}
        <Link href={"/register"} className="orangeText">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

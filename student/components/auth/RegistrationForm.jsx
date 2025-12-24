"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../Common/Button";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/services/authApi";
import Cookies from "js-cookie";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name can not be less than 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.idNumber) {
    errors.idNumber = "ID number is required";
  } else if (values.idNumber.length !== 13) {
    errors.idNumber = "ID number must contain 13 digits";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password cannot be less than 8 characters";
  }

  return errors;
};

const RegistrationForm = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation();

  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      idNumber: "",
      password: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signup({
          name: values.name,
          email: values.email,
          password: values.password,
          idNumber: values.idNumber,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth,
          role: "student",
        }).unwrap();
        alert("Account created successfully!");
        Cookies.set("token", response?.token);
        Cookies.set("token", JSON.stringify(response?.data));
        resetForm();
        router.push("/");
      } catch (error) {
        console.log("Err while creating an account >>>>", error);
        alert(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!"
        );
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col items-start justify-center gap-6 md:w-[80%]"
    >
      <Image
        src={"/logo.png"}
        width={172}
        height={32}
        className=""
        alt="logo"
      />
      <h1 className="text-[28px] font-semibold leading-8 m-0">
        Create Your Library Account
      </h1>
      <p className="text-lg leading-6 secondary-text">
        Please complete all fields and upload a valid university ID to gain
        access to the library
      </p>

      {/* Name */}
      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="name" className="secondary-text">
          Full name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="adrian@jsmastery.pro"
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-600 text-sm">{formik.errors.name}</p>
        ) : null}
      </div>
      {/* Email */}
      <div className="w-full flex flex-col items-start gap-1">
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
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        ) : null}
      </div>
      {/* ID number */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="idNumber" className="secondary-text">
          University ID Number
        </label>
        <input
          type="text"
          name="idNumber"
          id="idNumber"
          value={formik.values.idNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.idNumber && formik.errors.idNumber ? (
          <p className="text-red-600 text-sm">{formik.errors.idNumber}</p>
        ) : null}
      </div>
      {/* Date of birth */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="dateOfBirth" className="secondary-text">
          Date Of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.idNumber && formik.errors.idNumber ? (
          <p className="text-red-600 text-sm">{formik.errors.idNumber}</p>
        ) : null}
      </div>
      {/* phone number */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="phoneNumber" className="secondary-text">
          Contact No.
        </label>
        <input
          type="date"
          name="phoneNumber"
          id="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.idNumber && formik.errors.idNumber ? (
          <p className="text-red-600 text-sm">{formik.errors.idNumber}</p>
        ) : null}
      </div>
      {/* Password */}
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
          <p className="text-red-600 text-sm">{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="w-full mt-2">
        <Button text={"Register"} type={"submit"} loading={loading} />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Already have an account?{" "}
        <Link href={"/login"} className="orangeText">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;

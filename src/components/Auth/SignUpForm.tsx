"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { error } from "console";

function SignUpForm() {
  const [newUser, setNewUser] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [signingUp, setSigningup] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(false);
    setPasswordLengthError(false);
    setIsDuplicateEmail(false);
    setServerError(false);
    setSigningup(true);

    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.phoneNumber ||
      !newUser.email ||
      !newUser.password
    ) {
      setFieldError(true);
      setSigningup(false);
      return;
    } else {
      setFieldError(false);
      if (newUser.password.length < 8) {
        setPasswordLengthError(true);
        setSigningup(false);
        return;
      } else {
        setPasswordLengthError(false);
      }
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const status = res.status;

      if (!res.ok) {
        if (status === 409) {
          setIsDuplicateEmail(true);
        } else {
          setServerError(true);
        }
        return;
      }
      const data = await res.json();
      setSuccess(true);
    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setSigningup(false);
    }
  };

  return (
    <div className="w-[29rem] p-6">
      <h1 className="font-bold text-3xl text-pink-300 mb-6">
        Sign Up and let&apos;s get started!
      </h1>

      <div className="grid grid-cols-2 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="first name" className="text-pink-300">
            First Name
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-lg mt-2"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={newUser.firstName}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="last name" className="text-pink-300">
            Last Name
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-lg mt-2"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={newUser.lastName}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="phone number" className="text-pink-300">
            Phone Number
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-lg mt-2"
            placeholder="Your Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            value={newUser.phoneNumber}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="email" className="text-pink-300">
            Email
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-lg mt-2"
            placeholder="Your Email"
            name="email"
            onChange={handleChange}
            value={newUser.email}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-8">
        <div className="col-span-1">
          <Label htmlFor="Password" className="text-pink-300">
            Password
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-lg mt-2"
            placeholder="Your Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={newUser.password}
          />
        </div>
      </div>
      {fieldError && (
        <p className="text-sm mt-[-0.75rem] mb-2 text-red-500">
          Please fill all the fields.
        </p>
      )}
      {passwordLengthError && (
        <p className="text-sm mt-[-0.75rem] mb-2 text-red-500">
          Password must contain at least 8 characters.
        </p>
      )}
      {serverError && (
        <p className="text-sm mt-[-0.75rem] mb-2 text-red-500">
          An error occurred. Please try again later.
        </p>
      )}
      {isDuplicateEmail && (
        <p className="text-sm mt-[-0.75rem] mb-2 text-red-500">
          This email is already in use. Please try a different email.
        </p>
      )}
      {success && (
        <div className="mt-[-0.75rem] mb-2 ">
          <p className="text-sm inline">Account Created! Please click </p>
          <Link
            href={"/auth/login"}
            className="inline text-sm font-medium text-pink-300"
          >
            here
          </Link>
          <p className="text-sm inline"> to sign in.</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 w-full mb-3">
        <Button
          className="rounded-lg"
          onClick={handleSubmit}
          disabled={signingUp}
        >
          {signingUp ? "Signing Up" : "Sign Up"}
        </Button>
      </div>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link
          href={"/auth/login"}
          className="font-bold text-pink-300 underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;

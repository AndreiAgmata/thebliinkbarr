"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

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

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
    console.log(newUser);
  };

  const validateInput = () => {
    if (!newUser.firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!newUser.lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!newUser.phoneNumber) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
    if (!newUser.email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!newUser.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (newUser.password.length < 8 && newUser.password !== "") {
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(false);
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
          {firstNameError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
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
          {lastNameError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
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
          {phoneNumberError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
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
          {emailError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
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
          {passwordError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
          {passwordLengthError && (
            <p className="text-sm mt-1 text-red-500">
              Password must contain at least 8 characters.
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-3">
        <Button className="rounded-lg" onClick={handleSubmit}>
          Submit
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

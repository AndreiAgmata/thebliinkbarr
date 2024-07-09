"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [customer, setCustomer] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
    setSigningIn(true);
    setError(false);
    const email = customer.email;
    const password = customer.password;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(true);
      } else {
        router.push("/");
        router.refresh();
        setError(false);
      }
    } catch (error) {
      console.log("An Error Occurred: ", error);
      setError(true);
    } finally {
      setSigningIn(false);
    }
  };

  const validateInput = () => {
    if (!customer.email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!customer.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  return (
    <div className="w-[29rem] p-6">
      <h1 className="font-bold text-3xl text-pink-300 mb-6">
        Welcome back loves!
      </h1>

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
          />
          {emailError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-3">
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
          />
          {passwordError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-center text-red-500 mb-3 text-sm">
          Invalid Email/Password
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 w-full mb-3">
        <Button
          className="rounded-lg"
          onClick={handleSubmit}
          disabled={signingIn}
        >
          {signingIn ? "Signing In" : "Sign In"}
        </Button>
      </div>
      <div className="flex gap-2">
        <p>Don&apos;t have an account?</p>
        <Link
          href={"/auth/signUp"}
          className="font-bold text-pink-300 underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;

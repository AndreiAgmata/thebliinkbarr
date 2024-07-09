"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function SignUpButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/auth/signUp")}>Sign Up</Button>;
}

export default SignUpButton;

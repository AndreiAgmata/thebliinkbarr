"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function MyAccountButton() {
  const router = useRouter();
  return (
    <Button
      className="font-medium"
      onClick={() => router.push("/account/accountDetails")}
    >
      My Account
    </Button>
  );
}

export default MyAccountButton;

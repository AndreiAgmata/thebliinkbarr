"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function ShopNowButton() {
  const router = useRouter();
  return (
    <Button
      className="w-full"
      onClick={() => router.push("/products-category/all")}
    >
      Shop Now
    </Button>
  );
}

export default ShopNowButton;

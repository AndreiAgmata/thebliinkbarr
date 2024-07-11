"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { ShoppingCart } from "lucide-react";

function CartButton() {
  const getCart = async () => {
    try {
      const res = await fetch("/api/cart/get", {
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        console.log("Unable to get cart: Error Occurred");
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Unable to get cart: Error Occurred");
    }
  };

  return (
    <Button
      variant={"ghost"}
      className="flex items-center justify-center"
      onClick={() => getCart()}
    >
      <ShoppingCart />
    </Button>
  );
}

export default CartButton;

import { Button } from "@/components/ui/button";
import React from "react";
import { ShoppingCart } from "lucide-react";

function CartButton() {
  return (
    <Button variant={"ghost"} className="flex items-center justify-center">
      <ShoppingCart />
    </Button>
  );
}

export default CartButton;

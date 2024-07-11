"use client";
import React from "react";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

import { ShoppingCart } from "lucide-react";
import CartSideSheet from "./CartSideSheet";
import { useCartContext } from "@/context/CartContext";

function CartButton() {
  const { cart } = useCartContext();

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="button-wrapper relative">
            <Button
              variant={"ghost"}
              className="flex items-center justify-center"
            >
              <ShoppingCart />
            </Button>
            {cart.length > 0 && (
              <div className="cart-item-count h-5 w-5 flex justify-center items-center absolute top-0 right-[-2px] bg-pink-300 rounded-full">
                <p className="text-[0.65rem] font-medium mb-0">{cart.length}</p>
              </div>
            )}
          </div>
        </SheetTrigger>
        <CartSideSheet cart={cart} />
      </Sheet>
    </div>
  );
}

export default CartButton;

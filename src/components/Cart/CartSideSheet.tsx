"use client";
import React from "react";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { CartItem } from "../../../types/interfaces";
import CartItemCard from "./CartItemCard";
import { useRouter } from "next/navigation";
import {
  calculateHST,
  calculateShipping,
  calculateSubTotal,
  calculateTotal,
} from "../../../helpers/calculateTotalsHelper";

function CartSideSheet({ cart }: { cart: CartItem[] }) {
  const router = useRouter();
  return (
    <SheetContent className="flex flex-col">
      <SheetHeader>
        <SheetTitle className="text-2xl border-b border-neutral-300 pb-4 mb-4">
          Shopping Cart
        </SheetTitle>
      </SheetHeader>
      {cart.length > 0 ? (
        <>
          <div className="cart-items flex flex-col gap-3 max-h-[460px] overflow-y-auto">
            {cart.map((cartItem) => (
              <CartItemCard
                cartItemDetails={cartItem}
                key={cartItem.variationId}
              />
            ))}
          </div>

          <SheetFooter className="mt-auto flex flex-col">
            <div className="totals-wrapper p-2 bg-neutral-100 rounded-sm">
              <p className="font-bold text-xl mb-2">Cart Total</p>
              <span className="flex justify-between">
                <p className="font-medium text-[0.90rem]">Sub-total: </p>
                <p className="text-[0.90rem]">${calculateSubTotal(cart)}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-medium text-[0.90rem]">Shipping: </p>
                <p className="text-[0.90rem]">${calculateShipping(cart)}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-medium text-[0.90rem]">HST: </p>
                <p className="text-[0.90rem]">${calculateHST(cart)}</p>
              </span>
              <span className="flex justify-between mt-4">
                <p className="font-bold">Total: </p>
                <p className="font-bold">${calculateTotal(cart)}</p>
              </span>
            </div>
            <SheetClose asChild>
              <Button
                className="w-full font-medium"
                onClick={() => router.push("/checkout")}
              >
                CHECKOUT
              </Button>
            </SheetClose>
          </SheetFooter>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </SheetContent>
  );
}

export default CartSideSheet;

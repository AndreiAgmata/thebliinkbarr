"use client";
import Image from "next/image";
import React from "react";
import { CartItem } from "../../../types/interfaces";
import { useCartContext } from "@/context/CartContext";

function CartItemCard({ cartItemDetails }: { cartItemDetails: CartItem }) {
  const { removeFromCart } = useCartContext();
  return (
    <div className="cart-item grid grid-cols-4 gap-2 relative hover:bg-neutral-100 p-2 rounded-sm">
      <div
        className="remove-item cursor-pointer absolute top-[0.5rem] right-[0.5rem] z-10 w-4 h-4 flex items-center justify-center rounded-full hover:bg-white hover:text-pink-300"
        onClick={() => removeFromCart(cartItemDetails.variationId)}
      >
        <p className="text-sm">x</p>
      </div>
      <div className="image-container col-span-1">
        <div className="image-wrapper w-full aspect-square relative">
          <Image
            src={cartItemDetails.imageLink}
            alt="product image"
            fill
            className="object-cover rounded-sm"
          />
        </div>
      </div>
      <div className="details-wrapper col-span-3">
        <p className="text-medium font-medium">{cartItemDetails.name}</p>
        <div
          className={
            cartItemDetails.curlType || cartItemDetails.length
              ? "block"
              : "hidden"
          }
        >
          {cartItemDetails.curlType && (
            <span className="block">
              <p className="text-xs font-bold inline">Curl Type: </p>
              <p className="text-xs inline">{cartItemDetails.curlType}</p>
            </span>
          )}
          {cartItemDetails.length && (
            <span className="block">
              <p className="text-xs font-bold inline">Length: </p>
              <p className="text-xs inline">{cartItemDetails.length}mm</p>
            </span>
          )}
        </div>
        <div className={cartItemDetails.shape ? "block" : "hidden"}>
          {cartItemDetails.shape && (
            <span className="block">
              <p className="text-xs font-bold inline">Shape: </p>
              <p className="text-xs inline">
                {cartItemDetails.shape.toUpperCase()}
              </p>
            </span>
          )}
        </div>
        <span className="block">
          <p className="text-xs text-pink-300 inline">
            {cartItemDetails.quantity} x ${cartItemDetails.price}
          </p>
        </span>
      </div>
    </div>
  );
}

export default CartItemCard;

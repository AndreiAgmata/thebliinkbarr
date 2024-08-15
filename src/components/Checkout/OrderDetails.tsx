import { useCartContext } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import {
  calculateDiscount,
  calculateHST,
  calculateShipping,
  calculateSubTotal,
  calculateTotal,
} from "../../../helpers/calculateTotalsHelper";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import DiscountBlock from "./DiscountBlock";
import { useDiscountContext } from "@/context/DiscountContext";

function OrderDetails() {
  const { cart } = useCartContext();
  const { discountObject } = useDiscountContext();
  const { shippingAddress, isStorePickup } = useShippingDetailsContext();

  useEffect(() => {}, [isStorePickup]);

  return (
    <div className="col-span-1 flex flex-col">
      <p className="font-bold text-2xl mb-6">Order Details</p>
      <div className="content p-4 bg-white rounded-md flex flex-col justify-start items-start flex-1">
        <div className="cart-items w-full h-96 overflow-y-auto mb-4">
          {cart.map((cartItemDetails, index) => (
            <div
              className={`cart-item pb-3 ${
                index === cart.length - 1 ? "" : "border-b"
              } w-full mb-1 min-h-24`}
              key={cartItemDetails.variationId}
            >
              <p className="text-[0.90rem] font-bold">{cartItemDetails.name}</p>
              <span
                className={`block ${cartItemDetails.curlType ? "" : "hidden"}`}
              >
                <p className="text-xs font-bold inline">Curl Type: </p>
                <p className="text-xs inline">{cartItemDetails.curlType}</p>
              </span>
              <span
                className={`block ${cartItemDetails.length ? "" : "hidden"}`}
              >
                <p className="text-xs font-bold inline">Length: </p>
                <p className="text-xs inline">{cartItemDetails.length}mm</p>
              </span>
              <span
                className={`block ${cartItemDetails.shape ? "" : "hidden"}`}
              >
                <p className="text-xs font-bold inline">Shape: </p>
                <p className="text-xs inline">
                  {cartItemDetails.shape?.toUpperCase()}
                </p>
              </span>
              <span className="block">
                <p className="text-xs text-pink-300 inline">
                  {cartItemDetails.quantity} x ${cartItemDetails.price}
                </p>
              </span>
            </div>
          ))}
        </div>
        <div className="totals-wrapper w-full mt-auto border-t pt-3 border-neutral-300">
          <p className="font-bold text-xl mb-2">Order Total</p>
          <span className="flex justify-between">
            <p className="font-medium text-[0.90rem]">Sub-total: </p>
            <p className="text-[0.90rem]">${calculateSubTotal(cart)}</p>
          </span>
          {discountObject.discountCode != "" ? (
            <span className="flex justify-between">
              <p className="font-medium text-[0.90rem]">Discount: </p>
              <p className="text-[0.90rem]">
                -$
                {calculateDiscount(
                  cart,
                  discountObject.discountAmountPercentage
                )}
              </p>
            </span>
          ) : (
            <></>
          )}
          <span className="flex justify-between">
            <p className="font-medium text-[0.90rem]">Shipping: </p>
            <p className="text-[0.90rem]">
              {calculateShipping(cart, isStorePickup) === 15
                ? `$${calculateShipping(cart, isStorePickup)}`
                : "FREE"}
            </p>
          </span>
          <span className="flex justify-between">
            <p className="font-medium text-[0.90rem]">HST: </p>
            <p className="text-[0.90rem]">
              $
              {calculateHST(
                cart,
                isStorePickup,
                discountObject.discountAmountPercentage
              )}
            </p>
          </span>
          <span className="flex justify-between mt-4">
            <p className="font-bold">Total: </p>
            <p className="font-bold">
              $
              {calculateTotal(
                cart,
                isStorePickup,
                discountObject.discountAmountPercentage
              )}
            </p>
          </span>
        </div>
      </div>
      <DiscountBlock />
    </div>
  );
}

export default OrderDetails;

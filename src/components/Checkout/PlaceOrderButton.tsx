"use client";
import React from "react";
import {
  CartItem,
  OrderItemPayload,
  OrderPayload,
} from "../../../types/interfaces";
import { Button } from "../ui/button";
import { calculateTotal } from "../../../helpers/calculateTotalsHelper";
import { useCartContext } from "@/context/CartContext";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";

function PlaceOrderButton() {
  const { cart } = useCartContext();
  const { shippingAddress, isStorePickup } = useShippingDetailsContext();

  const createOrderPayload = () => {
    // Map cart items to order items
    const orderItems: OrderItemPayload[] = cart.map((cartItem) => ({
      productId: cartItem.productId,
      variationId: cartItem.variationId,
      quantity: cartItem.quantity,
    }));

    // Calculate total price
    const totalPrice = calculateTotal(cart);

    // Create order payload
    const orderPayload: OrderPayload = {
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      isStorePickup: isStorePickup,
      streetAddress: isStorePickup ? "" : shippingAddress.streetAddress,
      apartmentUnit: isStorePickup
        ? ""
        : `Unit #${shippingAddress.apartmentUnit}`,
      city: isStorePickup ? "" : shippingAddress.city,
      state: isStorePickup ? "" : shippingAddress.state,
      zipCode: isStorePickup ? "" : shippingAddress.zipCode,
      country: isStorePickup ? "" : shippingAddress.country,
      email: shippingAddress.email,
      phoneNumber: shippingAddress.phoneNumber,
      items: orderItems,
      totalPrice,
      status: "Processing", // Set the initial order status
    };

    console.log(orderPayload);
  };

  return (
    <Button className="mt-4" onClick={() => createOrderPayload()}>
      Place Order
    </Button>
  );
}

export default PlaceOrderButton;

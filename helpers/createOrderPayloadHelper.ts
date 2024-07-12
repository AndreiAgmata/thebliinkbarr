import {
  CartItem,
  OrderItemPayload,
  OrderPayload,
  ShippingAddress,
} from "../types/interfaces";
import { calculateTotal } from "./calculateTotalsHelper";

export const createOrderPayload = (
  cart: CartItem[],
  shippingAddress: ShippingAddress,
  isStorePickup: boolean,
  paymentId: string
) => {
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
    apartmentUnit: isStorePickup ? "" : shippingAddress.apartmentUnit,
    city: isStorePickup ? "" : shippingAddress.city,
    state: isStorePickup ? "" : shippingAddress.state,
    zipCode: isStorePickup ? "" : shippingAddress.zipCode,
    country: isStorePickup ? "" : shippingAddress.country,
    email: shippingAddress.email,
    phoneNumber: shippingAddress.phoneNumber,
    items: orderItems,
    totalPrice,
    paymentId: paymentId,
    status: "Processing", // Set the initial order status
  };

  return orderPayload;
};

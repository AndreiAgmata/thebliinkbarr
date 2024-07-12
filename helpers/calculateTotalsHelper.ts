import { CartItem } from "../types/interfaces";

export const calculateSubTotal = (cart: CartItem[]) => {
  let subTotal = 0;
  for (const cartItem of cart) {
    subTotal += cartItem.price * cartItem.quantity;
  }

  return parseFloat(subTotal.toFixed(2));
};

export const calculateShipping = (cart: CartItem[]) => {
  if (calculateSubTotal(cart) > 80) {
    return 0;
  } else {
    return 15;
  }
};

export const calculateHST = (cart: CartItem[]) => {
  return parseFloat((calculateSubTotal(cart) * 0.13).toFixed(2));
};

export const calculateTotal = (cart: CartItem[]) => {
  return parseFloat(
    (
      calculateSubTotal(cart) +
      calculateShipping(cart) +
      calculateHST(cart)
    ).toFixed(2)
  );
};

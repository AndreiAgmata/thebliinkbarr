import { CartItem } from "../types/interfaces";

export const calculateSubTotal = (cart: CartItem[]) => {
  let subTotal = 0;
  for (const cartItem of cart) {
    subTotal += cartItem.price * cartItem.quantity;
  }

  return parseFloat(subTotal.toFixed(2));
};

export const calculateDiscount = (cart: CartItem[]) => {
  const subTotal = calculateSubTotal(cart);
  const discount = subTotal * 0.15;
  return parseFloat(discount.toFixed(2));
};

export const calculateShipping = (cart: CartItem[], isStorePickup: boolean) => {
  if (calculateSubTotal(cart) > 80 || isStorePickup || cart.length === 0) {
    return 0;
  } else {
    return 15;
  }
};

export const calculateHST = (
  cart: CartItem[],
  isStorePickup: boolean,
  discountCode: string
) => {
  if (discountCode !== "") {
    const newSubtotal = calculateSubTotal(cart) - calculateDiscount(cart);
    return parseFloat(
      ((newSubtotal + calculateShipping(cart, isStorePickup)) * 0.13).toFixed(2)
    );
  }
  return parseFloat(
    (
      (calculateSubTotal(cart) + calculateShipping(cart, isStorePickup)) *
      0.13
    ).toFixed(2)
  );
};

export const calculateTotal = (
  cart: CartItem[],
  isStorePickup: boolean,
  discountCode: string
) => {
  if (discountCode !== "") {
    const newSubtotal = calculateSubTotal(cart) - calculateDiscount(cart);
    return parseFloat(
      (
        newSubtotal +
        calculateShipping(cart, isStorePickup) +
        calculateHST(cart, isStorePickup, discountCode)
      ).toFixed(2)
    );
  }

  return parseFloat(
    (
      calculateSubTotal(cart) +
      calculateShipping(cart, isStorePickup) +
      calculateHST(cart, isStorePickup, discountCode)
    ).toFixed(2)
  );
};

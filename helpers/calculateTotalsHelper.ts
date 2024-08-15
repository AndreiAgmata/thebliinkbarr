import { CartItem } from "../types/interfaces";

export const calculateSubTotal = (cart: CartItem[]) => {
  let subTotal = 0;
  for (const cartItem of cart) {
    subTotal += cartItem.price * cartItem.quantity;
  }

  return parseFloat(subTotal.toFixed(2));
};

export const calculateDiscount = (
  cart: CartItem[],
  discountAmountPercentage: number
) => {
  const subTotal = calculateSubTotal(cart);
  const discountToDecimal = discountAmountPercentage / 100;
  const discount = subTotal * discountToDecimal;
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
  discountAmountPercentage: number
) => {
  if (discountAmountPercentage !== 0) {
    const newSubtotal =
      calculateSubTotal(cart) -
      calculateDiscount(cart, discountAmountPercentage);
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
  discountAmountPercentage: number
) => {
  if (discountAmountPercentage !== 0) {
    const newSubtotal =
      calculateSubTotal(cart) -
      calculateDiscount(cart, discountAmountPercentage);
    return parseFloat(
      (
        newSubtotal +
        calculateShipping(cart, isStorePickup) +
        calculateHST(cart, isStorePickup, discountAmountPercentage)
      ).toFixed(2)
    );
  }

  return parseFloat(
    (
      calculateSubTotal(cart) +
      calculateShipping(cart, isStorePickup) +
      calculateHST(cart, isStorePickup, discountAmountPercentage)
    ).toFixed(2)
  );
};

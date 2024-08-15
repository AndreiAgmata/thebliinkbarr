"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "../../types/interfaces";

interface Discount {
  id: string;
  discountCode: string;
  discountAmountPercentage: number;
  isActive: boolean;
}

interface DiscountContextType {
  discountObject: Discount;
  addDiscountObject: (discount: Discount) => void;
  resetDiscountObject: () => void;
}

const DiscountContext = createContext<DiscountContextType | undefined>(
  undefined
);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
  const [discountObject, setDiscountObject] = useState<Discount>({
    id: "",
    discountCode: "",
    discountAmountPercentage: 0,
    isActive: false,
  });

  const addDiscountObject = (discount: Discount) => {
    setDiscountObject(discount);
  };

  const resetDiscountObject = () => {
    const nullDiscount = {
      id: "",
      discountCode: "",
      discountAmountPercentage: 0,
      isActive: false,
    };
    setDiscountObject(nullDiscount);
  };

  return (
    <DiscountContext.Provider
      value={{
        discountObject,
        addDiscountObject,
        resetDiscountObject,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscountContext = (): DiscountContextType => {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error("useDiscountContext must be used within a CartProvider");
  }
  return context;
};

"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ShippingAddress } from "../../types/interfaces";

interface ShippingDetailsContextType {
  shippingAddress: ShippingAddress;
  isStorePickup: boolean;
  areFieldsValid: boolean;
  updateShippingAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleIsStorePickup: () => void;
  updateAreFieldsValid: () => void;
}

const ShippingDetailsContext = createContext<
  ShippingDetailsContextType | undefined
>(undefined);

export const ShippingDetailsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartmentUnit: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    phoneNumber: "",
  });

  const [isStorePickup, setIsStorePickup] = useState(false);

  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const updateShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const toggleIsStorePickup = () => {
    if (!isStorePickup) {
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        ["streetAddress"]: "",
        ["apartmentUnit"]: "",
        ["city"]: "",
        ["state"]: "",
        ["zipCode"]: "",
        ["country"]: "",
      }));
    }

    setIsStorePickup(!isStorePickup);
  };

  return (
    <ShippingDetailsContext.Provider
      value={{
        shippingAddress,
        isStorePickup,
        areFieldsValid,
        updateShippingAddress,
        toggleIsStorePickup,
        updateAreFieldsValid,
      }}
    >
      {children}
    </ShippingDetailsContext.Provider>
  );
};

const updateAreFieldsValid = () => {};

export const useShippingDetailsContext = (): ShippingDetailsContextType => {
  const context = useContext(ShippingDetailsContext);
  if (!context) {
    throw new Error("must be used with a shipping details provider");
  }
  return context;
};

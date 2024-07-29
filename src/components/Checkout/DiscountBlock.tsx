import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCartContext } from "@/context/CartContext";

const DiscountBlock = () => {
  const { addDiscountCode } = useCartContext();
  const [inputValue, setInputValue] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCodeValid(false);
    setInputValue(e.target.value);
  };

  const validateDiscountCode = () => {
    setIsCodeValid(false);
    if (inputValue === "NL15") {
      addDiscountCode(inputValue);
      setApplied(true);
    } else {
      setIsCodeValid(true);
    }
  };

  return (
    <div className="discount-code-wrapper mt-4 p-4 bg-white rounded-md flex flex-col items-start justify-start gap-2">
      <p className="font-bold text-2xl mb-2">Discount Code</p>
      <Label>Enter a valid discount code:</Label>
      <Input
        className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
        value={inputValue}
        onChange={handleInputChange}
        disabled={applied}
      />
      {isCodeValid ? (
        <p className="text-xs text-red-500">
          {inputValue} is not a valid discount code.
        </p>
      ) : applied ? (
        <p className="text-xs text-pink-300">{inputValue} has been applied.</p>
      ) : (
        <></>
      )}
      <Button
        className="mt-2 px-8 ms-auto"
        onClick={() => validateDiscountCode()}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </Button>
      {/* <p className="text-center text-xs w-full mt-4">
        Disclaimer: Only 1 discount code is allowed for every order.
      </p> */}
    </div>
  );
};

export default DiscountBlock;

"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CustomerDetailsInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

function AccountDetails({
  customerDetails,
}: {
  customerDetails: CustomerDetailsInterface;
}) {
  const router = useRouter();
  const [customer, setCustomer] = useState(customerDetails);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const [saving, setSaving] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
    setSaving(true);
    setUpdateSuccess(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/updateDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }
      const data = await response.json();
      if (data) {
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setSaving(false);
      router.refresh();
    }
  };

  const validateInput = () => {
    if (!customer.firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!customer.lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!customer.phoneNumber) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
    if (!customer.email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    // if (!customer.password) {
    //   setPasswordError(true);
    // } else {
    //   setPasswordError(false);
    // }
    // if (customer.password.length < 8 && customer.password !== "") {
    //   setPasswordLengthError(true);
    // } else {
    //   setPasswordLengthError(false);
    // }
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-2 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="first name" className="">
            First Name
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-none border-neutral-400 placeholder:text-neutral-200  mt-2"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={customer.firstName}
          />
          {firstNameError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="last name" className="">
            Last Name
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-none border-neutral-400 placeholder:text-neutral-200  mt-2"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={customer.lastName}
          />
          {lastNameError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="phone number" className="">
            Phone Number
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-none border-neutral-400 placeholder:text-neutral-200 mt-2"
            placeholder="Your Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            value={customer.phoneNumber}
          />
          {phoneNumberError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full mb-2">
        <div className="col-span-1">
          <Label htmlFor="email" className="">
            Email
          </Label>
          <Input
            className="w-full bg-neutral-50 rounded-none border-neutral-400 placeholder:text-neutral-200  mt-2"
            placeholder="Your Email"
            name="email"
            onChange={handleChange}
            value={customer.email}
          />
          {emailError && (
            <p className="text-sm mt-1 text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      {updateSuccess && (
        <p className="text-sm text-pink-400">
          Account details has been updated!
        </p>
      )}
      <div className="button-container flex w-full">
        <Button
          className="rounded-lg mt-4 ms-auto w-36"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving Changes" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default AccountDetails;

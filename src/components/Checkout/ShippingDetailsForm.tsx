"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { Checkbox } from "../ui/checkbox";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";

function ShippingAddressForm() {
  const {
    shippingAddress,
    isStorePickup,
    updateShippingAddress,
    toggleIsStorePickup,
  } = useShippingDetailsContext();
  return (
    <div className="col-span-1">
      <p className="font-bold text-2xl mb-6">Shipping Details</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-1">
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={shippingAddress.firstName}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
          />
        </div>
        <div className="col-span-1">
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={shippingAddress.lastName}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-1">
          <Label>Email</Label>
          <Input
            name="email"
            value={shippingAddress.email}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
          />
        </div>
        <div className="col-span-1">
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            value={shippingAddress.phoneNumber}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-12 mb-4">
        <Checkbox
          id="storePickup"
          checked={isStorePickup}
          onCheckedChange={toggleIsStorePickup}
        />
        <label
          htmlFor="pickup on store"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Pick up in store
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-2">
          <Label>Street Address</Label>
          <Input
            name="streetAddress"
            value={shippingAddress.streetAddress}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-2">
          <Label>Apartment/Unit Number</Label>
          <Input
            name="apartmentUnit"
            value={shippingAddress.apartmentUnit}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="col-span-1">
          <Label>Town/City</Label>
          <Input
            name="city"
            value={shippingAddress.city}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
        <div className="col-span-1">
          <Label>State/Province</Label>
          <Input
            name="state"
            value={shippingAddress.state}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
        <div className="col-span-1">
          <Label>Zip/Postal Code</Label>
          <Input
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
        <div className="col-span-1">
          <Label>Country</Label>
          <Input
            name="country"
            value={shippingAddress.country}
            onChange={updateShippingAddress}
            className="w-full bg-neutral-50 rounded-sm border-neutral-400 placeholder:text-neutral-200"
            disabled={isStorePickup}
          />
        </div>
      </div>
    </div>
  );
}

export default ShippingAddressForm;

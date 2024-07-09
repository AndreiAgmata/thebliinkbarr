import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function SortByDropdown() {
  return (
    <div className="dropDown-wrapper flex gap-2 items-center">
      <p>Sort By: </p>
      <Select defaultValue={"bestSellers"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Best Sellers" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="bestSellers">Best Sellers</SelectItem>
            <SelectItem value="priceLowToHigh">Price, low to high</SelectItem>
            <SelectItem value="priceHighToLow">Price, high to Low</SelectItem>
            <SelectItem value="aToZ">Alphabetically, A to Z</SelectItem>
            <SelectItem value="zToA">Alphabetically, Z to A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortByDropdown;

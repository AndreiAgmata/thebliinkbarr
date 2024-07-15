import React from "react";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";
import HeaderMobile from "./HeaderMobile/HeaderMobile";
import { Label } from "../ui/label";

function Header() {
  return (
    <header>
      <div className="free-shipping-message w-screen py-1 bg-pink-200 sticky top-0 flex items-center justify-center">
        <Label className="text-xs text-white">Free shipping over $80</Label>
      </div>
      {/* DESKTOP HEADER */}
      <div className="header-content-wrapper container mx-auto py-4 hidden lg:flex justify-between items-center top-0">
        <HeaderDesktop />
      </div>
      {/* MOBILE HEADER */}
      <div className="header-content-wrapper px-3 py-4 flex lg:hidden justify-between items-center top-0 ">
        <HeaderMobile />
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";
import HeaderMobile from "./HeaderMobile/HeaderMobile";

function Header() {
  return (
    <header>
      {/* DESKTOP HEADER */}
      <div className="header-content-wrapper container mx-auto py-4 hidden lg:flex justify-between items-center top-0 ">
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

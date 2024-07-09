import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartButton from "../Buttons/CartButton";
import { IoMenu } from "react-icons/io5";

function HeaderMobile() {
  return (
    <>
      <div className="logo-wrapper w-[10rem] h-[3rem] relative">
        <Link href={"/"}>
          <Image
            src={"/PageAssets/logo.png"}
            fill
            sizes="100vh"
            className="object-contain"
            alt="logo"
            priority
          />
        </Link>
      </div>
      <div className="buttons flex items-center justify-center gap-2">
        <CartButton />
        <div className="menu-burger-wrapper w-[38px] h-[36px] bg-pink-300 rounded-lg flex items-center justify-center">
          <IoMenu size={"2em"} color="white" />
        </div>
      </div>

      {/* <div className="search-bar flex gap-2">
    <Input placeholder="What Are You Looking For?" className="w-96" />
    <Button>Search</Button>
  </div>
  <nav className="nav flex items-center gap-2">
    {session ? <MyAccountButton /> : <SignUpButton />}
    <CartButton />
  </nav> */}
    </>
  );
}

export default HeaderMobile;

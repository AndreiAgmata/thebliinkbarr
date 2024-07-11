import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignUpButton from "../Buttons/SignUpButton";
import CartButton from "../../Cart/CartButton";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";
import MyAccountButton from "../Buttons/MyAccountButton";

async function HeaderDesktop() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <div className="logo-wrapper w-[12rem] h-[3rem] relative">
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
      <div className="search-bar flex gap-2">
        <Input placeholder="What Are You Looking For?" className="w-96" />
        <Button>Search</Button>
      </div>
      <nav className="nav flex items-center gap-2">
        {session ? <MyAccountButton /> : <SignUpButton />}
        <CartButton />
      </nav>
    </>
  );
}

export default HeaderDesktop;

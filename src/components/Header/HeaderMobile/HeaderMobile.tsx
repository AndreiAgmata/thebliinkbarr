import CartButton from "@/components/Cart/CartButton";
import { Button } from "@/components/ui/button";
import nextAuthOptions from "@/lib/AuthOptions";
import { CircleUser } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
import SignUpButton from "../Buttons/SignUpButton";

async function HeaderMobile() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <>
      <div className="logo-wrapper w-[9rem] h-[3rem] relative">
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
        {session ? (
          <Link
            href={"/account/accountDetails"}
            className="menu-burger-wrapper w-[34px] h-[34px] bg-pink-300 rounded-full flex items-center justify-center"
          >
            <CircleUser color="white" />
          </Link>
        ) : (
          <SignUpButton />
        )}
      </div>
    </>
  );
}

export default HeaderMobile;

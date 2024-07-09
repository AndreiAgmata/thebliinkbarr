import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

function Footer() {
  return (
    <footer>
      <div className="w-screen relative h-16 lg:h-40">
        <Image
          src={"/PageAssets/footerDivider.svg"}
          alt="divider"
          fill
          className="object-cover absolute top-0"
        />
      </div>
      <div
        className="footer-content"
        style={{
          backgroundImage: "url('/PageAssets/footerOverlayLines.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1400px",
          backgroundPosition: "center",
        }}
      >
        <div className="content container mx-auto py-6 lg:py-10 min-h-64 flex flex-col lg:flex-row gap-x-12 gap-y-6 relative items-center lg:items-start">
          <div className="logo-wrapper w-[14rem] h-[5rem] relative">
            <Link href={"/"}>
              <Image
                src={"/PageAssets/logo.png"}
                fill
                className="object-contain hover:scale-[1.1] transition duration-200"
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div className="hyper-links flex gap-12">
            <div className="flex flex-col gap-1">
              <Link href={"/"} className="text-sm">
                Lash Trays
              </Link>
              <Link href={"/"} className="text-sm">
                Tweezers
              </Link>
              <Link href={"/"} className="text-sm">
                Accessories
              </Link>
              <Link href={"/"} className="text-sm">
                Services
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link href={"/"} className="text-sm">
                Shipping Policy
              </Link>
              <Link href={"/"} className="text-sm">
                Refund Policy
              </Link>
              <Link href={"/"} className="text-sm">
                Privacy Policy
              </Link>
              <Link href={"/"} className="text-sm">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="social-media flex gap-2 lg:ms-auto">
            <Link href={"https://instagram.com/thebliinkbarr"}>
              <FaInstagram
                size={"3em"}
                color="#f9a8d4"
                className="hover:scale-[1.1] transition duration-150"
              />
            </Link>
            <Link href={"https://tiktok.com"}>
              <AiFillTikTok
                size={"3em"}
                color="#f9a8d4"
                className="hover:scale-[1.1] transition duration-150"
              />
            </Link>
            <Link href={"/"}>
              <HiOutlineMailOpen
                size={"3em"}
                color="#f9a8d4"
                className="hover:scale-[1.1] transition duration-150"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

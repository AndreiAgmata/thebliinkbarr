"use client";
import LogOutButton from "@/components/MyAccount/LogOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <>
      <div className="container mx-auto min-h-[500px]">
        <div className="grid grid-cols-8 mt-8">
          <div className="menu col-span-8 lg:col-span-2 lg:p-5 lg:border-r lg:h-96">
            <div className="menu-title border-b ps-4 pb-2 hidden lg:block">
              <h1 className="text-lg font-bold">MY ACCOUNT</h1>
            </div>
            <div className="menu-options flex flex-col gap-1 pt-2">
              <Link
                href={"/account/accountDetails"}
                className={`font-medium ps-4 py-2 rounded-sm ${
                  pathName.includes("/accountDetails")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                Account Details
              </Link>
              <Link
                href={"/account/orders"}
                className={`font-medium ps-4 py-2 rounded-sm  ${
                  pathName.includes("/orders")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                Orders
              </Link>
              <LogOutButton />
            </div>
          </div>
          <div className="display col-span-8 lg:col-span-6 ">{children}</div>
        </div>
      </div>
    </>
  );
}

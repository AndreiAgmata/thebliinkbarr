import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto absolute top-0 py-4 z-10">
        <div className="logo-wrapper w-[9rem] lg:w-[12rem] h-[3rem] relative">
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
      </div>
      {children}
    </>
  );
}

"use client";
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
      <div className="container mx-auto min-h-[550px]">
        <div className="grid grid-cols-8 mt-8">
          <div className="menu col-span-8 lg:col-span-2 lg:p-5 lg:border-r lg:h-96">
            <div className="menu-title border-b ps-4 pb-2 hidden lg:block">
              <h1 className="text-lg font-bold">CATEGORIES</h1>
            </div>
            <div className="menu-options grid grid-cols-4 gap-1 pt-2">
              <Link
                href={"/products-category/all"}
                className={`font-medium ps-4 py-2 rounded-sm col-span-2 lg:col-span-4 ${
                  pathName.includes("/all")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                All
              </Link>
              <Link
                href={"/products-category/lashTrays"}
                className={`font-medium ps-4 py-2 rounded-sm col-span-2 lg:col-span-4 ${
                  pathName.includes("/lashTrays")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                Lash Trays
              </Link>
              <Link
                href={"/products-category/tweezers"}
                className={`font-medium ps-4 py-2 rounded-sm col-span-2 lg:col-span-4 ${
                  pathName.includes("/tweezers")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                Tweezers
              </Link>
              <Link
                href={"/products-category/accessories"}
                className={`font-medium ps-4 py-2 rounded-sm col-span-2 lg:col-span-4 ${
                  pathName.includes("/accessories")
                    ? "bg-pink-300"
                    : "hover:bg-neutral-50"
                }`}
              >
                Accessories
              </Link>
            </div>
          </div>
          <div className="display col-span-8 lg:col-span-6">{children}</div>
        </div>
      </div>
    </>
  );
}

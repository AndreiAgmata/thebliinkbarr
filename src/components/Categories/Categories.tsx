import Image from "next/image";
import Link from "next/link";
import React from "react";

function Categories() {
  return (
    <section
      className="categories bg-pink-100 bg-opacity-30 mt-[-3rem] lg:mt-24 mb-24"
      style={{
        backgroundImage: "url('/PageAssets/footerOverlayLines.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "2500px",
        backgroundPosition: "center",
      }}
    >
      <div className="content container mx-auto flex flex-col items-center py-28">
        <h1 className=" text-pink-400 font-bold text-3xl lg:text-4xl mb-8 text-center">
          Browse Our Categories
        </h1>
        <div className="categories-cards grid grid-cols-4 gap-6">
          <Link
            href={"/products-category/lashTrays"}
            className="category-card-1 col-span-2 lg:col-span-1 lg:w-56 lg:h-56 bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-4 border-none drop-shadow-md hover:scale-[1.05] transition duration-150 aspect-square relative"
            style={{
              backgroundImage: "url('/ItemImages/tray.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay absolute top-0 rounded-xl w-full h-full bg-pink-100 opacity-40"></div>
            <p className="text-xl lg:text-3xl font-bold text-neutral-50 z-10 drop-shadow-lg">
              LASH TRAYS
            </p>
          </Link>
          <Link
            href={"/products-category/tweezers"}
            className="category-card-1 col-span-2 lg:col-span-1 lg:w-56 lg:h-56 bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-4 border-none drop-shadow-md hover:scale-[1.05] transition duration-150 aspect-square relative"
            style={{
              backgroundImage: "url('/ItemImages/tweezer.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay absolute top-0 rounded-xl w-full h-full bg-pink-100 opacity-40"></div>
            <p className="text-xl lg:text-3xl font-bold text-neutral-50 z-10 drop-shadow-lg">
              TWEEZERS
            </p>
          </Link>
          <Link
            href={"/products-category/accessories"}
            className="category-card-1 col-span-2 lg:col-span-1 lg:w-56 lg:h-56 bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-4 border-none drop-shadow-md hover:scale-[1.05] transition duration-150 aspect-square relative"
            style={{
              backgroundImage: "url('/ItemImages/tiles.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay absolute top-0 rounded-xl w-full h-full bg-pink-100 opacity-40"></div>
            <p className="text-xl lg:text-3xl font-bold text-neutral-50 z-10 drop-shadow-lg">
              ACCESSORIES
            </p>
          </Link>
          <Link
            href={"https://thebliinkbarr.as.me/schedule.php"}
            className="category-card-1 col-span-2 lg:col-span-1 lg:w-56 lg:h-56 bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-4 border-none drop-shadow-md hover:scale-[1.05] transition duration-150 aspect-square relative"
            style={{
              backgroundImage: "url('/ItemImages/services.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay absolute top-0 rounded-xl w-full h-full bg-pink-100 opacity-40"></div>
            <p className="text-xl lg:text-3xl font-bold text-neutral-50 z-10 drop-shadow-lg">
              SERVICES
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;

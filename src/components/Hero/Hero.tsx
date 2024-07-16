import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import ShopNowButton from "./Hero Buttons/ShopNowButton";

function Hero() {
  return (
    <section className="hero container mx-auto">
      <div className="banner mt-20 grid grid-cols-2 gap-y-12 gap-24">
        <div className="text col-span-2 lg:col-span-1 flex flex-col items-center lg:items-end justify-center">
          <h1 className="text-[2.10rem] sm:text-4xl font-bold 0 w-full md:w-96 leading-tight mb-3 text-center lg:text-left text-pink-300">
            Hey Loves! Welcome to The Blinks Club
          </h1>
          <p className="w-full 0 md:w-96 text-sm leading-6 mb-5 text-center lg:text-left">
            {
              "Finally! You can shop and book your appointments all together. Shop our LUXURY MATTE CASHMERE LASH TRAYS that are prefect for all Lash techs. Lashing couldn't be more easier! Especially when you have quality Lash trays and accessories that help cut down your lashing time tremendously! Shop all your essential with us <3"
            }
          </p>
          <div className="buttons flex flex-col lg:flex-row gap-2 w-full 0 md:w-96">
            <ShopNowButton />
            <Button variant={"outline"} className="w-full">
              Services
            </Button>
          </div>
        </div>
        <div className="mascot col-span-2 lg:col-span-1 flex items-center lg:items-start justify-center">
          <div className="mascot-wrapper relative h-56 w-56 lg:w-96 lg:h-96">
            <Image
              src={
                "https://res.cloudinary.com/dko71zmmd/image/upload/f_auto,q_auto/kmghxj8oxd25pkc1kbin"
              }
              alt="mascot"
              className="object-contain drop-shadow-lg"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

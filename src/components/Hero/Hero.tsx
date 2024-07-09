import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import ShopNowButton from "./Hero Buttons/ShopNowButton";

function Hero() {
  return (
    <section className="hero container mx-auto">
      <div className="banner mt-20 grid grid-cols-2 gap-y-12 gap-24">
        <div className="text col-span-2 lg:col-span-1 flex flex-col items-center lg:items-end justify-center">
          <h1 className="text-[2.10rem] sm:text-4xl font-bold w-96 leading-tight mb-3 text-center lg:text-left text-pink-300">
            Hey Loves! Welcome to The Blinks Club
          </h1>
          <p className="w-96 text-sm leading-6 mb-5 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            obcaecati amet ipsa, dolor, tenetur adipisci fugit eum nam dolores
            inventore.
          </p>
          <div className="buttons flex flex-col lg:flex-row gap-2 w-96">
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

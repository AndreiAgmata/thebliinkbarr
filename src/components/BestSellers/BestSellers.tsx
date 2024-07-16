import React, { useState } from "react";
import ProductReelCard from "../ProductReelCard/ProductReelCard";
import Image from "next/image";

function BestSellers() {
  return (
    <section className="px-6 lg:px-24 flex flex-col items-center mb-24">
      <h1 className="font-bold text-4xl text-pink-300 mb-2">Reviews</h1>
      <p className="mb-8 text-sm text-center">
        See what our customers are raving about! Our products are top-rated for
        their quality and value.
      </p>
      <div className="product-reel w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="image-wrapper col-span-1 aspect-square relative">
          <Image
            src={"/Reviews/Review.JPEG"}
            alt="product image"
            fill
            className="object-fill rounded-lg"
          />
        </div>
        <div className="image-wrapper col-span-1 aspect-square relative">
          <Image
            src={"/Reviews/Review2.JPEG"}
            alt="product image"
            fill
            className="object-fill rounded-lg"
          />
        </div>
        <div className="image-wrapper col-span-1 aspect-square relative">
          <Image
            src={"/Reviews/Review3.JPEG"}
            alt="product image"
            fill
            className="object-fill rounded-lg"
          />
        </div>
        <div className="image-wrapper col-span-1 aspect-square relative">
          <Image
            src={"/Reviews/Review4.JPEG"}
            alt="product image"
            fill
            className="object-fill rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default BestSellers;

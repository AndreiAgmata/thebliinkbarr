"use client";
import React, { useState } from "react";
import ProductReelCard from "../ProductReelCard/ProductReelCard";

function BestSellers() {
  const [product, setProduct] = useState({
    id: "668b6fd5730223c4aa097a1f",
    name: "OG Lash Tray",
    description: "Sample Description",
    price: 9.99,
    quantity: 100,
    categoryId: "6688293dbfa17356428cc35d",
    lengthId: "668b64ae732fe3b73ddf59a6",
    curlTypeId: "668b6541a6e6a72e17dcb570",
  });

  return (
    <section className="container mx-auto flex flex-col items-center mb-24">
      <h1 className="text-3xl font-medium mb-2">Best Sellers</h1>
      <p className="mb-8">
        See what our customers are raving about! Our best sellers are top-rated
        for their quality and value.
      </p>
      <div className="product-reel w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
        <ProductReelCard product={product} />
      </div>
    </section>
  );
}

export default BestSellers;

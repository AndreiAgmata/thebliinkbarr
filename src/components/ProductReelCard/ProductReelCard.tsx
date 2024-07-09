import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../../../types/interfaces";

function ProductReelCard({ product }: { product: Product }) {
  return (
    <Link
      href={"/"}
      className="card col-span-1 hover:scale-[1.05] transition duration-150 hover:shadow-lg p-4 rounded-lg"
    >
      <div className="image-wrapper relative w-full aspect-square ">
        <Image
          src={"/ItemImages/tray.jpg"}
          alt="product image"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="text py-2">
        <p className="font-bold mb-1">{product.name}</p>
        <p className="font-medium text-pink-300">${product.price} CAD</p>
      </div>
    </Link>
  );
}

export default ProductReelCard;
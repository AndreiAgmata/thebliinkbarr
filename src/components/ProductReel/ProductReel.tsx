import React from "react";
import SortByDropdown from "./SortByDropdown";
import { Product } from "../../../types/interfaces";
import ProductReelCard from "../ProductReelCard/ProductReelCard";

function ProductReel({ products }: { products: Product[] | undefined }) {
  return (
    <div className="w-full p-4">
      <div className="top flex justify-end mb-4">
        <SortByDropdown />
      </div>
      <div className="product-cards grid grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <ProductReelCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default ProductReel;

import React from "react";
import SortByDropdown from "./SortByDropdown";
import { Product } from "../../../types/interfaces";
import ProductReelCard from "../ProductReelCard/ProductReelCard";

function ProductReel({ products }: { products: Product[] | undefined }) {
  return (
    <div className="w-full lg:p-4">
      <p className="mt-5 lg:mt-0 text-sm text-neutral-500">
        Showing {products?.length} product(s)
      </p>
      {/* <div className="top flex justify-start lg:justify-end mt-4 lg:mt-0 mb-4">
        <SortByDropdown />
      </div> */}
      <div className="product-cards grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <ProductReelCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default ProductReel;

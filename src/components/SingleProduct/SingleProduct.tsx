"use client";
import React, { useEffect, useState } from "react";
import { Product, Variation } from "../../../types/interfaces";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Button } from "../ui/button";
import { useCartContext } from "@/context/CartContext";

function SingleProduct({ productDetails }: { productDetails: Product }) {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [curlType, setCurlType] = useState("");
  const [length, setLength] = useState("");
  const [areOptionsValid, setAreOptionsValid] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  //Options and stock vs quantity validations
  useEffect(() => {
    setIsAddedToCart(false);
    const isSingleVariation = productDetails.variations.length === 1;

    const checkIfOptionsAreValid = () => {
      if (curlType === "" || length === "") {
        setAreOptionsValid(false);
      } else {
        setAreOptionsValid(true);
      }
    };

    const checkIfStockCanCoverQuantity = () => {
      if (isSingleVariation) {
        if (productDetails.variations[0].stock - quantity > 0) {
          setAreOptionsValid(true);
        } else {
          setAreOptionsValid(false);
        }
      } else {
        for (const variation of productDetails.variations) {
          if (
            variation.length === parseInt(length) &&
            variation.curlType === curlType
          ) {
            if (variation.stock - quantity > 0) {
              setAreOptionsValid(true);
              break;
            } else {
              setAreOptionsValid(false);
            }
          }
        }
      }
    };

    if (!isSingleVariation) {
      checkIfOptionsAreValid();
    }

    checkIfStockCanCoverQuantity();
  }, [productDetails, length, curlType, quantity]);

  const findVariationIdAndCreateCartItemObject = async () => {
    const isSingleVariation = productDetails.variations.length === 1;
    let selectedVariation;

    if (isSingleVariation) {
      selectedVariation = productDetails.variations[0];
    } else {
      selectedVariation = productDetails.variations.find(
        (variation) =>
          variation.length === parseInt(length) &&
          variation.curlType === curlType
      );
    }

    if (selectedVariation) {
      const cartItem = {
        productId: productDetails.id,
        variationId: selectedVariation.id,
        name: productDetails.name,
        imageLink: productDetails.imageLink,
        price: selectedVariation.price,
        length: selectedVariation.length,
        curlType: selectedVariation.curlType,
        quantity: quantity,
      };

      addToCart(cartItem);
      setIsAddedToCart(true);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-2 lg:mt-12">
      <div className="image-container col-span-2 md:col-span-1 p-3 lg:p-6">
        <div className="image-wrapper w-full aspect-square relative">
          <Image
            src={productDetails.imageLink}
            alt="product image"
            fill
            className="object-fill rounded-lg"
          />
        </div>
      </div>
      <div className="details-wrapper col-span-2 md:col-span-1 flex flex-col p-3 lg:p-6">
        <h1 className="font-bold text-3xl mb-4">{productDetails.name}</h1>
        <p className="text-xl font-medium mb-4 text-pink-300">
          ${productDetails.variations[0].price} CAD
        </p>
        <div
          className={`curl-type-toggle-wrapper mb-4 ${
            productDetails.variations.length === 1 ? "hidden" : ""
          }`}
        >
          <p className="font-medium mb-2 text-lg">Curl Type:</p>
          <ToggleGroup
            type="single"
            onValueChange={(value) => setCurlType(value)}
          >
            <ToggleGroupItem value={"D"} className="w-20">
              D
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div
          className={`length-toggle-wrapper mb-4 ${
            productDetails.variations.length === 1 ? "hidden" : ""
          }`}
        >
          <p className="font-medium mb-2 text-lg">Length:</p>
          <ToggleGroup
            type="single"
            onValueChange={(value) => setLength(value)}
          >
            {productDetails.variations.map((variation: Variation) => (
              <ToggleGroupItem
                value={variation.length ? variation.length?.toString() : ""}
                key={variation.id}
                className="w-20"
              >
                {variation.length}mm
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="quantity-toggle-wrapper mb-4">
          <p className="font-medium mb-2 text-lg">Quantity:</p>
          <div className="quantity-buttons flex flex-row items-center">
            <Button
              variant={"outline"}
              className="border-pink-100"
              disabled={quantity == 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </Button>
            <p className="w-10 text-center">{quantity}</p>
            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
        </div>
        {isAddedToCart && <p className="mb-2 text-pink-300">Added To Cart</p>}
        <div className="button-wrapper mb-4 col-span-2">
          <Button
            className="w-full"
            disabled={!areOptionsValid}
            onClick={() => findVariationIdAndCreateCartItemObject()}
          >
            Add To Cart
          </Button>
        </div>
      </div>
      <div className="description-wrapper col-span-2 p-6">
        <p>
          Product Description goes here. {productDetails.description}{" "}
          {productDetails.description} {productDetails.description}
        </p>
      </div>
      {/* <div className="related-products col-span-2 h-56 border border-neutral-400 mb-48">
        <p>Related products goes here</p>
      </div> */}
    </div>
  );
}

export default SingleProduct;
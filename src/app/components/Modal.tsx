"use client";

import React from "react";
import ModalClient from "./ModalClient";
import Link from "next/link";
import AddItemCounter from "./AddItemCounter";
import ButtonSubmit from "./ButtonSubmit";
import ButtonChangeImage from "./ButtonChangeImage";
import ButtonColor from "./ButtonColor";
import { ConvertToLocalePrice } from "@/utils/convertion";
import { useAppSelector } from "@/libs/redux/hooks";
const Modal = ({
  searchParams,
  params,
}: {
  params: { productId: string };
  searchParams: {
    modal?: string | undefined;
    img?: string | undefined;
    cart?: string | undefined;
  };
}) => {
  const { selectedProduct: product } = useAppSelector(
    ({ products }) => products
  );
  console.log({ product });
  if (!product) return;
  const { colors, images } = product;

  const queryParams = searchParams;
  const actualImage = Number(queryParams.img);
  return (
    <ModalClient>
      <div className="w-full h-screen fixed top-0 left-0 z-[30] flex flex-col items-center justify-center backdrop-blur-sm color">
        <Link
          href={"/"}
          className="w-full h-screen fixed top-0 left-0 z-[40]"
        />
        <div className="box-border z-[90] bg-white h-[70%] w-3/4 flex flex-col p-4 md:p-8 overflow-scroll lg:h-[90%] md:h-[90%] sm:h-[70%] rounded-md">
          <ButtonChangeImage
            product={product}
            images={images}
            actualImage={actualImage}
          />
          <h2 className="text-2xl font-bold mb-2 md:text-4xl">
            {product.name}
          </h2>
          <h3 className="text-xl font-bold md:text-2xl">
            ${ConvertToLocalePrice(product.price)}
          </h3>
          <p className="text-sm font-bold mt-2">Descripción</p>
          <div className="text-sm font-medium mb-2 w-full bg-zinc-200 text-zinc-900 rounded-md p-2">
            <p>{product.description}</p>
          </div>
          <p>Stock: {product.itemsLeft}</p>
          <div className="flex gap-2">
            <ButtonColor colors={colors} />
          </div>
          <AddItemCounter />
          <ButtonSubmit product={product} image={images[0]} />
        </div>
      </div>
    </ModalClient>
  );
};

export default Modal;

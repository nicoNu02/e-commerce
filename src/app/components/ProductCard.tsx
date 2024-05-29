"use client";

import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import Link from "next/link";

const ProductCard = ({
  idx,
  images,
  name,
  price,
}: {
  name: string;
  idx: string;
  price: string;
  images:
    | [
        {
          id: number;
          url: string;
          product_id: string;
        }
      ]
    | undefined[];
}) => {
  const getUrl = (id: string) => {
    const url = new URL(`/product/${id}`, "http://localhost:3000");
    url.searchParams.delete("cart");
    url.searchParams.set("modal", "open");
    url.searchParams.set("img", "0");
    return url;
  };
  const imageFound = images.find((value) => {
    return value?.product_id == idx;
  });
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center h-full w-full px-0 md:px-0 lg:px-0">
        <div className="w-full h-full flex justify-center p-3 relative">
          <Image
            //@ts-ignore
            src={imageFound.url}
            alt={name}
            className=" rounded-lg"
            fill
            sizes="(max-width: 380px) 380px"
          />
        </div>
      </div>
      <div className="flex flex-col items-center h-48 w-full justify-center">
        <h5 className="text-center h-12 flex flex-col items-center justify-center pt-2">
          {name}
        </h5>
        <p className="pt-2">
          <b>${price}</b>
        </p>
        <Link
          href={getUrl(idx)}
          scroll={false}
          className="bg-black rounded-2xl text-white w-3/4 h-8 flex items-center justify-center mb-4 mt-2"
        >
          Comprar
        </Link>
      </div>
    </Suspense>
  );
};

export default ProductCard;

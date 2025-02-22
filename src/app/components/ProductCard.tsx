"use client";

import Image from "next/image";
import { Suspense } from "react";
import Loading from "./Loading";
import Link from "next/link";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setSelectedProduct } from "@/libs/redux/actions/products";

const ProductCard = ({
  id,
  idx,
  name,
  price,
  url,
}: {
  id: string;
  name: string;
  idx: string;
  price: string;
  url: string | null;
}) => {
  const dispatch = useAppDispatch();
  const getUrl = (id: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(`/product/${id}`, window?.location.origin);
      url.searchParams.delete("cart");
      url.searchParams.set("modal", "open");
      url.searchParams.set("img", "0");
      return url;
    }
    return "";
  };
  const handleClickBuy = async () => {
    dispatch(setSelectedProduct({ id }));
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center h-full w-full px-0 md:px-0 lg:px-0">
        <div className="w-full h-full flex justify-center p-3 relative">
          <Image
            //@ts-ignore
            src={url}
            alt={name}
            className=" rounded-lg"
            fill
            sizes="(max-width: 380px) 380px"
          />
        </div>
      </div>
      <div className="flex flex-col items-center min-h-[50%] w-full justify-between sm:justify-center sm:min-h-[33%]">
        {/* 35 character limit prevents text overflow */}
        <h5 className="text-center h-12 flex flex-col items-center justify-center pt-2 px-1 font-medium text-white">
          {name}
        </h5>
        <p className="pt-2 text-white text-xl">
          <b>${price}</b>
        </p>
        <Link
          onClick={handleClickBuy}
          href={getUrl(idx)}
          scroll={false}
          className="bg-pink border-2 rounded-2xl hover:scale-105 transition-transform text-white w-3/4 h-8 flex items-center justify-center mb-4 mt-2"
        >
          Comprar
        </Link>
      </div>
    </Suspense>
  );
};

export default ProductCard;

"use client";

import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setSelectedProduct } from "@/libs/redux/actions/products";
import { useRouter, useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const handleClickBuy = async () => {
    dispatch(setSelectedProduct({ id }));
    const url = new URLSearchParams(params);

    url.set("img", "0");
    url.set("modal", "open");
    url.delete("cart");
    url.set("origin", "/");
    url.set("productId", id);
    window.history.pushState(null, "", `?${url.toString()}`);
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
        <div
          onClick={handleClickBuy}
          className="bg-pink border-2 rounded-2xl hover:scale-105 transition-transform text-white w-3/4 h-8 flex items-center justify-center mb-4 mt-2 cursor-pointer"
        >
          Comprar
        </div>
      </div>
    </Suspense>
  );
};

export default ProductCard;

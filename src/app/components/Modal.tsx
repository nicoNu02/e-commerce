"use client";

import React, { useEffect } from "react";
import AddItemCounter from "./AddItemCounter";
import ButtonSubmit from "./ButtonSubmit";
import ButtonChangeImage from "./ButtonChangeImage";
import ButtonColor from "./ButtonColor";
import { ConvertToLocalePrice } from "@/utils/convertion";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useParams } from "next/navigation";
import { fetchSelectedProduct, setSelectedProduct } from "@/libs/redux";
import { CloseSVG } from "./SVG";
import Loading from "./Loading";
const Modal = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const { selectedProduct: product, loadingFetchSelectedProduct } =
    useAppSelector(({ products }) => products);

  const params = useParams();
  const dispatch = useAppDispatch();

  const modal = searchParams.get("modal");
  const cart = searchParams.get("cart");
  const actualImage = searchParams.get("img");
  const productId = searchParams.get("productId");

  const handleClickCloseModal = () => {
    const url = new URLSearchParams(searchParams.toString());

    const origin = searchParams.get("origin") || "/";
    if (window.location.pathname === origin) {
      url.delete("modal");
      url.delete("img");
      url.delete("cart");
      url.delete("origin");
      url.delete("productId");
      window.history.pushState(null, "", `${origin}?${url.toString()}`);
    } else {
      url.delete("modal");
      url.delete("img");
      url.delete("cart");
      url.delete("origin");
      url.delete("productId");
      window.history.pushState(null, "", `/?${url.toString()}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (params.productId) {
      console.log("fetching product");
      dispatch(fetchSelectedProduct({ id: params.productId as string }));
    } else if (productId) {
      console.log("fetching product from searchParams");
      dispatch(fetchSelectedProduct({ id: productId }));
    }
  }, []);

  useEffect(() => {
    if (modal !== "open" && window.location.pathname.match(/product/)) {
      window.history.pushState(null, "", "/");
      window.location.reload();
    }
  }, []);

  if (modal !== "open") return <></>;

  return (
    product && (
      <div className="w-full h-screen fixed top-0 left-0 z-[30] flex flex-col items-center justify-center backdrop-blur-sm color">
        <div
          onClick={handleClickCloseModal}
          className="w-full h-screen fixed top-0 left-0 z-[40]"
        />
        <div className="box-border z-[90] bg-white h-[70%] w-3/4 flex flex-col p-4 md:p-8 overflow-scroll lg:h-[90%] md:h-[90%] sm:h-[70%] lg:w-3/5  rounded-md relative">
          <CloseSVG
            onClick={handleClickCloseModal}
            className="w-8 h-8 absolute top-6 right-6 hover:scale-110 transition-transform duration-75"
          />
          {loadingFetchSelectedProduct ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />;
            </div>
          ) : (
            <>
              <ButtonChangeImage
                product={product}
                images={product.images}
                actualImage={actualImage ? Number(actualImage) : 0}
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
                <ButtonColor colors={product.colors} />
              </div>
              <AddItemCounter />
              <ButtonSubmit product={product} image={product.images[0]} />
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;

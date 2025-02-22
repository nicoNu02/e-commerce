"use client";

import { useSearchParams } from "next/navigation";
import { useAppContext } from "../contexts";
import { useState } from "react";
import { Image } from "@prisma/client";
import { Product } from "@/types/types";

const ButtonSubmit = ({
  product,
  image,
}: {
  product: Product;
  image: Image;
}) => {
  //@ts-ignore
  const { handleAddToCart, cart } = useAppContext();
  const [ok, setOk] = useState<boolean | null>();
  const params = useSearchParams();
  const handleSubmit = () => {
    const color = params.get("color") || "";
    const count = Number(params.get("count")) || null;
    if (color !== "" && count !== null) {
      const cartProduct = {
        id: product.id,
        color: color,
        count: count,
        name: product.name,
        price: product.price,
        url: image.url,
      };
      handleAddToCart(cartProduct);
      setOk(true);
    } else setOk(false);
    setTimeout(() => {
      setOk(null);
    }, 1000);
  };
  return (
    <div className="flex flex-col justify-center items-center my-4 relative w-full">
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-pink text-white px-8 py-4 rounded-lg w-full md:w-1/2"
      >
        Agregar al Carrito
      </button>
      {ok === true ? (
        <div className="absolute top-[60px]">Agregado al carrito</div>
      ) : ok === false ? (
        <div className="absolute top-[60px] text-[red]">
          Error al agregar al carrito
        </div>
      ) : null}
    </div>
  );
};

export default ButtonSubmit;

"use client";

import { useSearchParams } from "next/navigation";
import { useAppContext } from "../contexts";
import { useState } from "react";

const ButtonSubmit = ({ productId }: { productId: string }) => {
  //@ts-ignore
  const { handleAddToCart, cart } = useAppContext();
  const [ok, setOk] = useState<boolean | null>();
  const params = useSearchParams();
  const handleSubmit = () => {
    const color = params.get("color") || "";
    const count = Number(params.get("count")) || null;
    if (color !== "" && count !== null) {
      const product = {
        id: productId,
        color: color,
        count: count,
      };
      handleAddToCart(product);
      setOk(true);
    } else setOk(false);
    setTimeout(() => {
      setOk(null);
    }, 1000);
  };
  return (
    <div className="flex flex-col justify-center items-center m-4 relative">
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-black text-white px-9 py-4 rounded"
      >
        Agregar al Carrito
      </button>
      {ok === true ? (
        <div className="absolute top-[-30px]">Agregado al carrito</div>
      ) : ok === false ? (
        <div className="absolute top-[-30px] text-[red]">
          Error al agregar al carrito
        </div>
      ) : null}
    </div>
  );
};

export default ButtonSubmit;

import { Cart } from "@/types/types";
import Image from "next/image";
import AddItemCounterCart from "./AddItemCounterCart";
import { ConvertToLocalePrice } from "@/utils/convertion";
import { useAppContext } from "../contexts";
import { useState } from "react";

export default function CartProductDetails({ prod }: { prod: Cart }) {
  const { handleDeleteFromCart, handleAddToCart } = useAppContext();
  const [count, setCount] = useState(prod.count);
  const handleChange = (cant: number) => {
    if (count + cant > 0) {
      const newCount = count;
      setCount(newCount + cant);
      handleAddToCart({ ...prod, count: cant });
    }
    return;
  };
  return (
    <div className="flex bg-zinc-800 my-4 rounded-md p-4 relative items-center">
      {/* todo: fix this */}
      <div className="h-20 relative mr-4 w-24">
        <Image
          className="rounded"
          src={prod.url}
          alt={"product image"}
          fill
          sizes="max-width(200px), 200px"
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <div>
          <p className="font-bold text-lg text-zinc-200 ">{prod.name}</p>
          <p
            className="w-4 h-4 rounded-full m-2"
            style={{ backgroundColor: prod.color }}
          ></p>
          <AddItemCounterCart handleChange={handleChange} count={count} />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-bold text-lg text-zinc-200">
            ${ConvertToLocalePrice(prod.price)}
          </p>
          <button
            type="button"
            className="font-bold bg-zinc-200 rounded w-4 h-4"
            onClick={() => handleDeleteFromCart({ ...prod })}
          ></button>
        </div>
      </div>
    </div>
  );
}

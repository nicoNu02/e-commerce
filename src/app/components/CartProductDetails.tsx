import { Cart } from "@/types/types";
import Image from "next/image";
import AddItemCounterCart from "./AddItemCounterCart";
import { ConvertToLocalePrice } from "@/utils/convertion";
import { useState } from "react";
import { useAppDispatch } from "@/libs/redux/hooks";
import { addTocart, deleteFromCart } from "@/libs/redux";
import { TrashSVG } from "./SVG";

export default function CartProductDetails({ prod }: { prod: Cart }) {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(prod.count);
  const handleChange = (cant: number) => {
    if (count + cant > 0) {
      const newCount = count;
      setCount(newCount + cant);
      dispatch(addTocart({ ...prod, count: cant }));
    }
    return;
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart({ ...prod, count: -prod.count }));
  };
  return (
    <div className="flex bg-pink my-4 rounded-md p-4 relative items-center  ">
      <div className="h-[20vw] relative mr-4 w-24 sm:h-20 sm:w-20">
        <Image
          className="rounded"
          src={prod.image.url}
          alt={"product image"}
          fill
          sizes="max-width(200px), 200px"
        />
      </div>
      <div className="flex flex-col w-full justify-between sm:flex-row">
        <div>
          <p className="font-bold text-lg text-white ">{prod.name}</p>
          <p
            className="w-4 h-4 rounded-full m-2"
            style={{ backgroundColor: prod.color.name }}
          ></p>
          <AddItemCounterCart handleChange={handleChange} count={count} />
        </div>
        <div className="flex m-2 gap-4 items-center sm:m-0">
          <p className="font-bold text-lg text-white">
            ${ConvertToLocalePrice(prod.price)}
          </p>
          <button
            type="button"
            className=" bg-red-500 w-8 h-8 p-1 rounded hover:scale-110 transition-transform"
            onClick={handleDeleteFromCart}
          >
            <TrashSVG className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

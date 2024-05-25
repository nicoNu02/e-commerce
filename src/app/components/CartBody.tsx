"use client";

import { useAppContext } from "../contexts";
import Image from "next/image";

const CartBody = () => {
  const { cart } = useAppContext();
  return (
    <div>
      {cart.map(
        (prod: { id: number; count: number; color: string }, i: number) => {
          return (
            <div key={i} className="flex bg-white my-4 rounded-md p-2">
              {/* todo: fix this */}
              {/* <Image
                className="h-30 w-30 rounded"
                src={PRODUCTS[prod.id].src[0]}
                alt={PRODUCTS[prod.id].desc}
                width={50}
                height={50}
              /> */}
              <div>
                {/* <p>{PRODUCTS[prod.id].name}</p> */}
                <div className="flex">
                  <span>+</span>
                  <p>{prod.count}</p>
                  <span>-</span>
                </div>
                <p>{prod.color}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default CartBody;

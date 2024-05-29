"use client";

import { Cart } from "@/types/types";
import { useAppContext } from "../contexts";
import CartProductDetails from "./CartProductDetails";

const CartBody = () => {
  const { cart } = useAppContext();

  return (
    <div className="w-full">
      {cart.map(
        //@ts-ignore
        (prod: Cart, i: number) => {
          return <CartProductDetails prod={prod} key={i} />;
        }
      )}
    </div>
  );
};

export default CartBody;

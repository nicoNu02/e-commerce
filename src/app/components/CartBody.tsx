"use client";

import { Cart, Method } from "@/types/types";
import CartProductDetails from "./CartProductDetails";
import { ConvertToLocalePrice } from "@/utils/convertion";
import ShippingMethod from "./ShippingMethod";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { orderState, setMethod } from "@/libs/redux";
import { methods } from "../constants";

const CartBody = () => {
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const { cart, method } = useAppSelector(orderState);
  const dispatch = useAppDispatch();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [total, setTotal] = useState(subtotalPrice + shippingPrice);
  const [selected, setSelected] = useState(0);
  console.log(cart);
  useEffect(() => {
    dispatch(setMethod(methods[0]));
    if (method) {
      setSelected(method.id);
      setShippingPrice(method.price);
    }
  }, []);
  const handleClick = (id: number, price: number | null) => {
    if (!price) return;
    selected != id ? setSelected(id) : setSelected(-1);
    setShippingPrice(price);
    const method = methods[id];
    dispatch(setMethod(method));
  };

  useEffect(() => {
    cart.map((prod) => setSubtotalPrice(prod.price * prod.count));
  }, [cart]);

  useEffect(() => {
    setTotal(shippingPrice + subtotalPrice);
  }, [shippingPrice, subtotalPrice]);

  return cart.length > 0 ? (
    <>
      <div className="w-full text-white overflow-auto">
        {cart.map((prod: Cart, i: number) => {
          return <CartProductDetails prod={prod} key={i} />;
        })}
        <hr />
        <div className=" my-2 flex justify-between">
          <h4 className="font-medium">Subtotal</h4>
          <p>${ConvertToLocalePrice(subtotalPrice)}</p>
        </div>
        <hr />
        <div className="flex flex-col justify-between my-4 w-full bg-purple-400 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Metodo de envio</h2>
          {methods.map((opc, i) => (
            <ShippingMethod
              key={i}
              id={opc.id}
              title={opc.title}
              price={opc.price}
              details={opc.details}
              handleClick={handleClick}
              selected={selected}
            />
          ))}
        </div>
        <div className="w-full flex justify-between my-4">
          <h4 className="font-medium">Envio</h4>
          <p>{ConvertToLocalePrice(shippingPrice)}</p>
        </div>
        <hr />
        <div className="flex justify-between my-4">
          <h2 className="text-2xl font-bold ">Total</h2>
          <p>{ConvertToLocalePrice(total)}</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center hover:scale-110 transition-transform duration-75">
        {selected !== -1 && cart.length > 0 ? (
          <Link
            href={"/checkout"}
            className="z-50 w-[80%] bg-purple-500 p-4 flex justify-center items-center text-center text-white font-bold text-2xl rounded-md"
          >
            Iniciar Compra
          </Link>
        ) : (
          <div className="w-[80%] bg-white p-4 flex justify-center items-center text-center text-zinc-900 font-bold text-2xl rounded-md">
            Iniciar la compra
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="text-zinc-200 font-bold text-2xl w-full flex justify-center mt-20">
      No hay productos en el carrito
    </div>
  );
};

export default CartBody;

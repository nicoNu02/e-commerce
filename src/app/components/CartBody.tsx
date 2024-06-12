"use client";

import { Cart, Method } from "@/types/types";
import { useAppContext } from "../contexts";
import CartProductDetails from "./CartProductDetails";
import { ConvertToLocalePrice } from "@/utils/convertion";
import ShippingMethod from "./ShippingMethod";
import { useEffect, useState } from "react";
import Link from "next/link";

const methods: Method[] = [
  {
    id: 0,
    title: "Envio a acordar con el vendedor",
    price: 990,
    details: "Por el momento solo realizamos envios a Rosario y alrededores",
  },
  // {
  //   id: 1,
  //   title: "Envio a sucursal",
  //   price: 980,
  //   details: "3 a 5 dias habiles",
  // },
  // {
  //   id: 2,
  //   title: "Retiro en local",
  //   price: 970,
  //   details: "1 a 3 dias habiles",
  // },
];
const CartBody = () => {
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const { cart, handleAddToCart, method, handleChangeMethod } = useAppContext();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [total, setTotal] = useState(subtotalPrice + shippingPrice);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    handleChangeMethod(methods[0]);
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
    handleChangeMethod(method);
  };

  useEffect(() => {
    cart.map((prod) => setSubtotalPrice(prod.price * prod.count));
  }, [cart]);
  useEffect(() => {
    setTotal(shippingPrice + subtotalPrice);
  }, [shippingPrice, subtotalPrice]);
  return cart.length > 0 ? (
    <div className="w-full text-zinc-200 overflow-auto">
      {cart.map((prod: Cart, i: number) => {
        return <CartProductDetails prod={prod} key={i} />;
      })}
      <hr />
      <div className=" my-2 flex justify-between">
        <h4 className="font-medium">Subtotal</h4>
        <p>${ConvertToLocalePrice(subtotalPrice)}</p>
      </div>
      <hr />
      <div className="flex flex-col justify-between my-4 w-full bg-zinc-500 p-4 rounded-lg">
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
      <div className="w-full flex justify-center items-center">
        {selected !== -1 && cart.length > 0 ? (
          <Link
            href={"/checkout"}
            className="w-[80%] bg-white p-4 flex justify-center items-center text-center text-black font-bold text-2xl rounded-md"
          >
            Iniciar Compra
          </Link>
        ) : (
          <div className="w-[80%] bg-zinc-800 p-4 flex justify-center items-center text-center text-zinc-900 font-bold text-2xl rounded-md">
            Iniciar la compra
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="text-zinc-200 font-bold text-2xl w-full flex justify-center mt-20">
      No hay productos en el carrito
    </div>
  );
};

export default CartBody;

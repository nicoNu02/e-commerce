"use client";

import { ConvertToLocalePrice } from "@/utils/convertion";
import { useState } from "react";

export default function ShippingMethod({
  title,
  details,
  price,
  id,
  handleClick,
  selected,
}: {
  id: number;
  title: string;
  details: string;
  price: number;
  handleClick: (id: number, price: number) => void;
  selected: number;
}) {
  return (
    <div
      className={
        selected == id
          ? "flex bg-zinc-800 my-2 p-4 items-center rounded-md border-4 border-zinc-400 transition delay-50 ease-in"
          : "flex bg-zinc-800 my-2 p-4 items-center rounded-md"
      }
    >
      <div
        className="w-8 h-8 rounded-full bg-black flex justify-center items-center mr-2"
        onClick={() => handleClick(id, price)}
      >
        <div
          className={
            selected == id
              ? "w-4 h-4 opacity-100 bg-white transition delay-50 ease-in rounded-full"
              : "w-4 h-4 opacity-0 transition delay-50 ease-in rounded-full"
          }
        ></div>
      </div>
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-md font-medium">
          ${ConvertToLocalePrice(price)} - {details}
        </p>
      </div>
    </div>
  );
}

"use client";

import { Image as ImageType, Product } from "@/types/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ButtonChangeImage({
  images,
  product,
  actualImage,
}: {
  product: Product;
  images: ImageType[];
  actualImage: number;
}) {
  const params = useSearchParams();
  const url = new URLSearchParams(params);

  const handleClick = (idx: number) => {
    setActualI(idx);
    url.set("img", idx.toString());
    window.history.pushState(null, "", `?${url.toString()}`);
  };
  const [actualI, setActualI] = useState(actualImage || 0);
  return (
    <>
      <div className="w-[50vw] h-[70vh] place-self-center flex justify-center items-center relative mb-4 md:w-1/2 md:h-full lg:w-1/2 lg:h-full sm:w-1/2 sm:h-3/4">
        <Image
          className="rounded-lg"
          src={images[actualI].url}
          alt={product.name}
          fill
          sizes="(max-width: 900px) 900px "
          priority
        />
      </div>
      <div className="flex gap-4">
        {images.map((it, i) => {
          return (
            <div
              className={"relative size-[15vw] sm:size-20 md:size-20 mb-4"}
              key={i}
              onClick={() => handleClick(i)}
            >
              <Image
                src={it.url}
                alt={product.description}
                className="rounded-md"
                fill
                sizes="(max-width: 100px), 100px"
              />
            </div>
            // </Link>
          );
        })}
      </div>
    </>
  );
}

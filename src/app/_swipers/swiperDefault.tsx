"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "@/products/products";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SwiperDefault() {
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const handleClick = (idx: number) => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("cart");
    searchParams.set("modal", "open");
    searchParams.set("img", "0");
    console.log(path, searchParams.toString());
    replace(`/product/${idx}?${searchParams.toString()}`);
  };
  return (
    <div className="h-96 mx-16">
      <Swiper
        key={"asd"}
        className="h-full mx-32"
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          820: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1240: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {PRODUCTS.map((key, i) => {
          const name = key.name;
          const imageSrc = key.src[0];
          const imageAlt = key.desc;
          const idx = key.id;
          return (
            <SwiperSlide key={i} className="flex">
              <div className="flex flex-col items-center justify-center w-full h-full border-solid border-2 rounded-xl">
                <ProductCard
                  src={imageSrc}
                  alt={imageAlt}
                  name={name}
                  idx={idx.toString()}
                  price="$00"
                />
                <button
                  onClick={() => handleClick(idx)}
                  className="bg-black rounded-2xl text-white w-1/2 h-8 flex items-center justify-center"
                >
                  Comprar
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

//rounded-lg bg-black text-white

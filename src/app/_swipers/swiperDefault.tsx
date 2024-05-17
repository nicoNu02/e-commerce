"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "@/products/products";

export default function SwiperDefault() {
  return (
    <div className="h-96 mx-16">
      <Swiper
        className="h-full mx-32"
        loop
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
          const idx = key.id.toString();
          return (
            <SwiperSlide key={i} className="flex">
              <div className="flex flex-col align-center justify-center w-full h-full border-solid border-2 rounded-xl">
                <ProductCard
                  src={imageSrc}
                  alt={imageAlt}
                  name={name}
                  idx={idx}
                  price="$00"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

//rounded-lg bg-black text-white

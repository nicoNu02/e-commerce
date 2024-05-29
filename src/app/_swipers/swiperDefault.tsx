"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../components/ProductCard";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "../components/loading";
import { Image, Product } from "@/types/types";
import { ConvertToLocalePrice } from "@/utils/convertion";

export default function SwiperDefault({
  products,
  images,
}: {
  products: Product[];
  images: Image[];
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-80 mx-2 md:mx-16 md:h-96 lg:mx-16 lg:h-[30rem]">
        <Swiper
          key={"asd"}
          className="h-full mx-32"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
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
          navigation
        >
          {products?.map((key, i) => {
            const name = key.name;
            const idx = key.id;
            const price = ConvertToLocalePrice(key.price);
            return (
              <SwiperSlide key={i} className="flex">
                <div className="flex flex-col items-center justify-between w-full h-full border-solid border-2 rounded-xl">
                  <ProductCard
                    name={name}
                    idx={idx}
                    //@ts-ignore
                    images={images}
                    price={price}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Suspense>
  );
}

//rounded-lg bg-black text-white

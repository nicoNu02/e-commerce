"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getAllProductsByCategory } from "@/libs/redux";

export default function SwiperCategory({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
  }[];
}) {
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className="w-full flex flex-col justify-center items-center mt-16"
        style={{ zIndex: -1 }}
      >
        <h1 className="font-bold text-4xl mb-2 text-pink">Categorías</h1>
        <p className="w-1/2 text-center mb-4">
          Encontrá más fácil el producto que buscás
        </p>
      </div>
      <div className="h-96 mx-8 md:mx-16 lg:mx-16 mb-16">
        <Swiper
          key={"asd"}
          className="h-96"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          style={{
            //@ts-ignore
            "--swiper-pagination-color": "#ff66c4",
            "--swiper-navigation-color": "#ff66c4",
          }}
          breakpoints={{
            520: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            540: {
              slidesPerView: 2,
            },
            820: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation
        >
          {categories?.map((cat, i) =>
            cat.name !== "Todo" ? (
              <SwiperSlide key={i}>
                <Link
                  href={`/categories/${cat.id}`}
                  className="flex flex-col items-center w-full h-full border-solid border-2 rounded-xl"
                >
                  <div
                    key={i}
                    className="text-2xl font-bold h-full flex flex-col justify-center"
                  >
                    <span className="mt-10 text-center">
                      {cat.name.toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-primary w-full h-16 rounded-b-xl"></div>
                </Link>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </>
  );

  //rounded-lg bg-black text-white
}

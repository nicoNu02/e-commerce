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
import { ProductType } from "@/types/types";
import { ConvertToLocalePrice } from "@/utils/convertion";
import Link from "next/link";
import { useAppSelector } from "@/libs/redux/hooks";
import Loading from "../components/Loading";

export default function SwiperDefault({
  products,
  title,
  description,
}: {
  products: ProductType[];
  title: string | null;
  description: string | null;
}) {
  const { loadingGetAllProducts } = useAppSelector(({ products }) => products);

  return (
    <>
      <div className="w-full flex flex-col items-center mb-16">
        <h1 className="font-bold text-4xl mt-8 text-pink">{title}</h1>
        <p className="w-1/2 text-center mb-4">{description}</p>
      </div>

      {loadingGetAllProducts || products.length === 0 ? (
        <div className="flex justify-center items-center h-80 mx-2 sm:mx-16 md:mx-16 lg:mx-16 sm:h-[45vh] min-w-40">
          <Loading />;
        </div>
      ) : (
        <div className="h-80 mx-2 sm:mx-16 md:mx-16 lg:mx-16 sm:h-[45vh] min-w-40">
          <Swiper
            className="h-full mx-32 flex items-center"
            modules={[Navigation]}
            style={{
              //@ts-ignore
              "--swiper-pagination-color": "#ff66c4",
              "--swiper-navigation-color": "#ff66c4",
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              390: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
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
              const url = key.url;
              return (
                <SwiperSlide
                  key={key.name}
                  className="flex items-center justify-center"
                >
                  <>
                    <div className="bg-primary p-2 flex flex-col items-center justify-between w-[30vw] min-w-40 h-full border border-rose-300 rounded-xl sm:w-64">
                      <ProductCard
                        id={key.id}
                        name={name}
                        url={url}
                        idx={idx}
                        price={price}
                      />
                    </div>
                  </>
                </SwiperSlide>
              );
            })}
            {products.length > 0 && (
              <SwiperSlide
                className="flex items-center justify-center"
                key={title}
              >
                <Link
                  href={"/products"}
                  className="flex flex-col items-center justify-center w-[30vw] min-w-40 h-full border-solid border-2 rounded-xl sm:w-64"
                >
                  <h5 className="text-center h-12 flex flex-col items-center justify-center pt-2 px-1 font-bold text-lg">
                    Ver mas
                  </h5>
                </Link>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      )}
    </>
  );
}

//rounded-lg bg-black text-white

"use client";

import { ConvertToLocalePrice } from "@/utils/convertion";
import Header from "./Header";
import ProductCardToProductsPage from "./ProductCardToProductsPage";
import Loading from "@/app/components/Loading";

export default function ProductGrid({
  products,
  title,
  isLoading,
  origin,
}: {
  products: any[];
  title: string;
  isLoading: boolean;
  origin: string;
}) {
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col p-8">
        <h1 className="text-xl font-bold mb-8">{title}</h1>
        {isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className=" grid grid-cols-2 max-w-96 sm:max-w-full gap-2 mt-4 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3  ">
            {products.map((product, i) => (
              <div key={i} className="w-full flex justify-center">
                <div
                  key={i}
                  className="border w-36 border-rose-300 sm:w-48 flex flex-col gap-4 bg-primary rounded-md"
                >
                  <ProductCardToProductsPage
                    origin={origin}
                    idx={product.id}
                    name={product.name}
                    price={ConvertToLocalePrice(product.price)}
                    url={product.url}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

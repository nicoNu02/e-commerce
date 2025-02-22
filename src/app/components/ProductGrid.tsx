"use client";

import { ConvertToLocalePrice } from "@/utils/convertion";
import Header from "./Header";
import ProductCardToProductsPage from "./ProductCardToProductsPage";
import { useAppSelector } from "@/libs/redux/hooks";
import Loading from "./Loading";

export default function ProductGrid({
  products,
  title,
}: {
  products: any[];
  title: string;
}) {
  const { loadingGetAllProducts } = useAppSelector(({ products }) => products);
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col p-8">
        <h1 className="text-xl font-bold mb-8">{title}</h1>
        {loadingGetAllProducts ? (
          <div className="flex flex-1 justify-center items-center">
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

import { ConvertToLocalePrice } from "@/utils/convertion";
import { FetchProducts } from "../../../fetchData";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductCardToProductsPage from "../components/ProductCardToProductsPage";
import Loading from "../components/loading";
import { Suspense } from "react";

export default async function Productos() {
  const products = await FetchProducts();
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <div className="w-full h-full flex flex-col p-8">
        <h1 className="text-xl font-bold">Productos</h1>
        <div className="w-full h-full grid grid-cols-2 gap-2 mt-4 ">
          {products.map((product, i) => (
            <div key={i} className="w-full h-full">
              <ProductCardToProductsPage
                idx={product.id}
                name={product.name}
                price={ConvertToLocalePrice(product.price)}
                url={product.url}
              />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}

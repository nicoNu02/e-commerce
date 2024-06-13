import { ConvertToLocalePrice } from "@/utils/convertion";
import Header from "./Header";
import ProductCardToProductsPage from "./ProductCardToProductsPage";

export default function ProductGrid({
  products,
  title,
}: {
  products: any[];
  title: string;
}) {
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col p-8">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className=" grid grid-cols-2 max-w-96 sm:max-w-full gap-2 mt-4 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3  ">
          {products.map((product, i) => (
            <div key={i} className="w-full flex justify-center">
              <div key={i} className="border-2 max-w-48">
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
      </div>
    </>
  );
}

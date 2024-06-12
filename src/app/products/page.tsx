import { ConvertToLocalePrice } from "@/utils/convertion";
import { FetchProducts } from "../../../fetchData";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductCardToProductsPage from "../components/ProductCardToProductsPage";

export default async function Productos() {
  const products = await FetchProducts();
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col p-8">
        <h1 className="text-xl font-bold">Productos</h1>
        <div className="w-full h-full grid grid-cols-3 gap-2">
          {products.map((product, i) => (
            <div key={i}>
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
    </>
  );
}

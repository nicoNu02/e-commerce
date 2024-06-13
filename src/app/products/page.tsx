import { ConvertToLocalePrice } from "@/utils/convertion";

import { Suspense } from "react";
import Loading from "../components/loading";
import Header from "../components/Header";
import { FetchProducts } from "../../../fetchData";
import ProductCardToProductsPage from "../components/ProductCardToProductsPage";
import ProductGrid from "../components/ProductGrid";

export default async function Productos() {
  const products = await FetchProducts();
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid products={products} title="Productos" />
    </Suspense>
  );
}

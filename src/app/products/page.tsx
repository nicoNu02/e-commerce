"use client";

import { Suspense } from "react";
import Loading from "../components/loading";
import ProductGrid from "../components/ProductGrid";
import { useProductsAndCategories } from "../hooks/useFetchData";

export default function Productos() {
  const { products } = useProductsAndCategories();
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid products={products} title="Productos" />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect } from "react";
import Loading from "../components/Loading";
import ProductGrid from "../components/ProductGrid";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllProducts } from "@/libs/redux/actions/products";

export default function Productos() {
  const { products } = useAppSelector(({ products }) => products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid products={products} title="Productos" />
    </Suspense>
  );
}

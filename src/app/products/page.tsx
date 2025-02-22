"use client";

import { Suspense, useEffect } from "react";
import Loading from "../components/Loading";
import ProductGrid from "../components/ProductGrid";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllProducts } from "@/libs/redux/actions/products";
import Modal from "../components/Modal";
import { useSearchParams } from "next/navigation";

export default function Productos() {
  const { products, loadingGetAllProducts } = useAppSelector(
    ({ products }) => products
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid
        products={products}
        title="Productos"
        isLoading={loadingGetAllProducts}
        origin="/products"
      />
      <Modal searchParams={searchParams} />
    </Suspense>
  );
}

"use client";

import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllProducts } from "@/libs/redux/actions/products";
import Modal from "../components/Modal";
import { useSearchParams } from "next/navigation";

export default function ProductsContent() {
  const { products, loadingGetAllProducts } = useAppSelector(
    ({ products }) => products
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <ProductGrid
        products={products}
        title='Productos'
        isLoading={loadingGetAllProducts}
        origin='/products'
      />
      <Modal searchParams={searchParams} />
    </>
  );
}

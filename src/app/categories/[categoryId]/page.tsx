"use client";

import Loading from "@/app/components/Loading";
import Modal from "@/app/components/Modal";
import ProductGrid from "@/app/components/ProductGrid";
import { getAllProductsByCategory, productState } from "@/libs/redux";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ProductsByCategoryPage = () => {
  const { categoryId } = useParams();
  const {
    productsByCategory,
    errorGetAllProductsCategory,
    loadingGetAllProductsCategory,
  } = useAppSelector(productState);
  const products = productsByCategory.map((product) => product.product);

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  useEffect(() => {
    dispatch(getAllProductsByCategory({ categoryId: categoryId as string }));
  }, [dispatch, categoryId]);

  {
    return (
      <>
        <ProductGrid
          products={products}
          isLoading={loadingGetAllProductsCategory}
          title={
            loadingGetAllProductsCategory
              ? ""
              : productsByCategory[0]?.category.name
          }
          origin={`/categories/${categoryId}`}
        />
        <Modal searchParams={searchParams} />
      </>
    );
  }
};

export default ProductsByCategoryPage;

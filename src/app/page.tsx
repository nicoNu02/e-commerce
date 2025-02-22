"use client";

import { Suspense, useEffect } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import SwiperCategory from "./_swipers/swiperCategory";
import WhatsappIcon from "./components/WhatsappIcon";
import { useProductsAndCategories } from "./hooks/useFetchData";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllProducts } from "@/libs/redux/actions/products";
import { getAllCategories } from "@/libs/redux/actions/categories";

export default function Home() {
  const { products } = useAppSelector(({ products }) => products);
  const { categories } = useAppSelector(({ categories }) => categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <>
      <Header />
      <WhatsappIcon />
      <Shipping />
      <SwiperDefault
        title={"Productos"}
        description={"Todo lo de nuestra tienda"}
        products={products}
      />
      <SwiperCategory categories={categories} />
    </>
  );
}

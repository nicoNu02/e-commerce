"use client";

import { useEffect } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import SwiperCategory from "./_swipers/swiperCategory";
import WhatsappIcon from "./components/WhatsappIcon";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllProducts } from "@/libs/redux/actions/products";
import { getAllCategories } from "@/libs/redux/actions/categories";
import { createOrder, setCart, setMethod } from "@/libs/redux";
import Modal from "./components/Modal";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { products } = useAppSelector(({ products }) => products);
  const { categories } = useAppSelector(({ categories }) => categories);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = localStorage.getItem("myData");
    if (savedData) {
      const data = JSON.parse(savedData);
      dispatch(setCart(data.cart));
      dispatch(setMethod(data.method));
      dispatch(createOrder(data.formCheckout));
    }
  }, []);
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
      <Modal searchParams={searchParams} />
    </>
  );
}

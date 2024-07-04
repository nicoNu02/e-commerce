"use client";
import { useState, useEffect } from "react";
import { FetchProducts, fetchCategories } from "../../../fetchData";

export const useProductsAndCategories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      FetchProducts(),
      fetchCategories(),
    ]);
    //@ts-ignore
    setProducts(fetchedProducts);
    //@ts-ignore
    setCategories(fetchedCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, categories, loading, refetch: fetchData };
};

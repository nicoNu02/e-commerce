"use client";
import { Product } from "@/types/types";
import { ChangeEvent, FormEvent, useState } from "react";
import ProductCardDashboard from "./ProductCardDashboard";
import { useDebouncedCallback } from "use-debounce";
import { FetchProductByName } from "../../../fetchData";
const initialForm = {
  name: "",
};
export default function SearchProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setProducts([]);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const debounced = useDebouncedCallback((e) => {
    const text = e.target.value;
    if (!text) return;
    const fetchProducts = async () => {
      const response = await FetchProductByName(text);
      setProducts(response);
    };
    fetchProducts();
  }, 500);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };
  return (
    <>
      <form
        className="flex flex-col p-2 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="font-medium text-sm">
          Buscar por Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-2/3 border rounded-lg px-2 py-1"
          value={form.name}
          onChange={(e) => {
            handleChange(e);
            debounced(e);
          }}
        />
      </form>
      <section className="grid grid-cols-2 gap-4 m-2 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product, i) => (
          <ProductCardDashboard
            key={i}
            url={product.url}
            name={product.name}
            price={product.price}
            id={product.id}
            fetchProducts={() => {
              setProducts([]);
              debounced(form.name);
            }}
          />
        ))}
      </section>
    </>
  );
}

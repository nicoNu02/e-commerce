"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent, FormEvent, useState } from "react";
import SearchModal from "./SearchModal";
import { FetchProductByName } from "../../../fetchData";
export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const params = useSearchParams();
  const searchParam = params.get("search");
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(params);

    if (!searchParam) {
      newParams.set("search", "");
    }
    newParams.set("search", e.target.value);
    window.history.pushState(null, "", `?${newParams.toString()}`);
    if (!e.target.value) {
      setProducts([]);
      newParams.delete("search");
      window.history.pushState(null, "products", `?${newParams.toString()}`);
    }
  };
  const debounced = useDebouncedCallback((e) => {
    const value = e.target.value.toLowerCase();
    if (!value) return;
    const fetchProducts = async () => {
      const products = await FetchProductByName(value);
      setProducts(products);
    };
    fetchProducts();
  }, 500);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(params);
    router.push(`/products?${newParams.toString()}`);

    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className=" w-full h-full flex justify-end">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex w-full justify-end items-center ml-2"
      >
        {open ? (
          <div className="relative w-full">
            <input
              type="text"
              className=" w-full p-1 bg-zinc-200 rounded-lg transition delay-50 ease-in"
              onChange={(e) => {
                handleChange(e), debounced(e);
              }}
              value={searchParam || ""}
            ></input>
            {searchParam ? <SearchModal products={products} /> : null}
          </div>
        ) : null}
        <button className="ml-2 " onClick={handleClick} type="button">
          <Image
            src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/searchIcon-ysvRqR1w71dKnOIWDdVE1T2xtOFdBH.svg"
            alt="search-icon"
            width={19}
            height={19}
            unoptimized
          />
        </button>
      </form>
    </div>
  );
}

"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, FormEvent, ChangeEvent } from "react";

interface Product {
  name: string | readonly string[] | number | undefined;
  description: string | readonly string[] | number | undefined;
  color: string | readonly string[] | number | undefined;
  price: string | readonly string[] | number | undefined;
  itemsLeft: string | readonly string[] | number | undefined;
  url: string[];
  category: {
    nails: boolean;
    hair: boolean;
    eyebrows: boolean;
    face: boolean;
    all: boolean;
  };
}
interface Category {
  name: string | readonly string[] | number | undefined;
  description: string | readonly string[] | number | undefined;
}
const initialProduct: Product = {
  name: "",
  description: "",
  color: "",
  price: 0,
  itemsLeft: 0,
  url: [],
  //the order of the categories are the same as the ids on the db
  category: {
    nails: false,
    hair: false,
    eyebrows: false,
    face: false,
    all: true,
  },
};
const initialCategory: Category = {
  name: "",
  description: "",
};

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [url, setUrl] = useState<String[]>([]);
  const [product, setProduct] = useState(initialProduct);
  const [category, setCategory] = useState(initialCategory);
  // const handleDeleteDB = async () => {
  //   const response = await fetch("/api/auth/category/upload", {
  //     method: "GET",
  //   });
  //   console.log(response);
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/auth/image?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
    setUrl([...url, newBlob.url]);
    console.log(newBlob.url);
    setProduct({ ...product, url: [...product.url, newBlob.url] });
  };
  const handleReset = () => {
    setUrl([]);
    setProduct({ ...product, url: [] });
  };
  const handleSubmitProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = Object.values(product.category).some((checked) => checked);
    if (isValid || product.category.all) {
      console.log(isValid);
      const response = await fetch("/api/auth/product", {
        method: "POST",
        body: JSON.stringify(product),
      }).then((res) => console.log(res));

      setProduct(initialProduct);
    } else {
      alert("please select a category for the product");
    }
  };
  const handleSubmitCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = fetch("/api/auth/category", {
      method: "POST",
      body: JSON.stringify(category),
    });
    setCategory(initialCategory);
  };
  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeCategory = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(product.url);
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleChangeProductCategory = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(product);
    const name = e.target.name;
    console.log(name);
    if (name == "hair")
      setProduct({
        ...product,
        category: { ...product.category, hair: !product.category.hair },
      });
    if (name == "face")
      setProduct({
        ...product,
        category: { ...product.category, face: !product.category.face },
      });
    if (name == "eyebrows")
      setProduct({
        ...product,
        category: {
          ...product.category,
          eyebrows: !product.category.eyebrows,
        },
      });
    if (name == "nails")
      setProduct({
        ...product,
        category: { ...product.category, nails: !product.category.nails },
      });
  };
  return (
    <>
      <h1 className="font-bold text-2xl">Upload product image</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="bg-black text-white p-8 rounded-md "
          name="file"
          ref={inputFileRef}
          type="file"
          required
        />
        <button
          type="submit"
          className="text-xl font-bold bg-black text-white rounded-md p-2 w-64 mb-6"
        >
          Upload Image
        </button>
      </form>
      {url.length > 0 && (
        <div>
          Blob url:
          {url.map((u, i) => (
            <>
              {/*@ts-ignore*/}
              <img src={u} height={100} width={100} alt="image" />
              {/* <p key={i}>{u}</p> */}
            </>
          ))}
          <button
            className="bg-black text-white font-bold p-2 rounded-md w-64"
            onClick={handleReset}
          >
            Reset Images
          </button>
        </div>
      )}
      <h1 className="text-2xl font-bold">Product details</h1>
      <form
        className="flex flex-col bg-slate-500 p-4 gap-[8px] mb-6"
        onSubmit={handleSubmitProduct}
      >
        <input
          className="rounded-md p-2"
          type="text"
          placeholder="name"
          name="name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeProduct(e)
          }
          value={product.name}
        />
        <textarea
          className="rounded-md p-2"
          placeholder="description"
          name="description"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChangeProduct(e)
          }
          value={product.description}
        ></textarea>
        <input
          className="rounded-md p-2"
          type="text"
          placeholder="color: #ask123-colname/#poi123-colname..."
          name="color"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeProduct(e)
          }
          value={product.color}
        />
        <input
          className="rounded-md p-2"
          type="number"
          placeholder="$1999.99"
          name="price"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeProduct(e)
          }
          value={product.price}
        />
        <input
          className="rounded-md p-2"
          type="number"
          placeholder="items left"
          name="itemsLeft"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeProduct(e)
          }
          value={product.itemsLeft}
        />
        <div className="flex flex-col items-start gap-2">
          <label className="font-bold text-md" htmlFor="nails">
            nails
          </label>
          <input
            className="w-8 h-8"
            type="checkbox"
            name="nails"
            id="nails"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProductCategory(e)
            }
            checked={product.category.nails}
          />
          <label className="font-bold text-md" htmlFor="hair">
            hair
          </label>
          <input
            className="w-8 h-8"
            type="checkbox"
            name="hair"
            id="hair"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProductCategory(e)
            }
            checked={product.category.hair}
          />
          <label className="font-bold text-md" htmlFor="eyebrows">
            eyebrows
          </label>
          <input
            className="w-8 h-8"
            type="checkbox"
            name="eyebrows"
            id="eyebrows"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProductCategory(e)
            }
            checked={product.category.eyebrows}
          />
          <label className="font-bold text-md" htmlFor="face">
            face
          </label>
          <input
            className="w-8 h-8"
            type="checkbox"
            name="face"
            id="face"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProductCategory(e)
            }
            checked={product.category.face}
          />
        </div>
        <button
          className="bg-black text-white font-bold p-2 rounded-md w-64 self-center"
          type="submit"
        >
          Upload Product
        </button>
      </form>
      <h1 className="font-2xl font-bold">Create Categories</h1>
      <form
        className="flex flex-col bg-sky-600 p-4"
        onSubmit={handleSubmitCategory}
      >
        <label htmlFor="category-name" className="font-bold text-md">
          Name
        </label>
        <input
          className="rounded-md p-2"
          type="text"
          id="category-name"
          name="name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeCategory(e)
          }
          required
          value={category.name}
        />
        <label htmlFor="category-description" className="font-bold text-md">
          Description
        </label>
        <textarea
          className="rounded-md p-2"
          name="description"
          id="category-description"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChangeCategory(e)
          }
          value={category.description}
          required
        ></textarea>
        <button
          type="submit"
          className="text-white bg-black font-xl font-bold rounded-lg w-64 p-2 mt-2"
        >
          Submit
        </button>
      </form>
    </>
  );
}

"use client";

import { PutBlobResult } from "@vercel/blob";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface Product {
  name: string | readonly string[] | number | undefined;
  description: string | readonly string[] | number | undefined;
  price: string | readonly string[] | number | undefined;
  itemsLeft: string | readonly string[] | number | undefined;
  url: string[];
  category: {
    nails: string;
    hair: string;
    eyebrows: string;
    face: string;
    all: string;
  };
}
interface Color {
  name: string | readonly string[] | number | undefined;
  code: string | readonly string[] | number | undefined;
  product_id?: string | readonly string[] | number | undefined;
}
interface Category {
  id: string;
  name: string | undefined;
  description: string | undefined;
}
const initialProduct: Product = {
  name: "",
  description: "",
  price: "",
  itemsLeft: "",
  url: [],
  //the order of the categories are the same as the ids on the db
  category: {
    nails: "",
    hair: "",
    eyebrows: "",
    face: "",
    all: "",
  },
};
const initialColor: Color = {
  name: "",
  code: "",
  product_id: "",
};

export default function ProductUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [colorList, setColorList] = useState<Array<Color>>();
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [url, setUrl] = useState<string[]>([]);
  const [color, setColor] = useState<Array<Color>>([]);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [colorSelected, setColorSelected] = useState([]);
  const [categories, setCategories] = useState<Array<Category>>();
  const [productColors, setProductColors] = useState([]);
  const [colorPicker, setColorPicker] = useState({});

  const handleColorPickerDelete = (col: Color) => {
    setProductColors([...productColors.filter((color) => color !== col)]);
    setColor([...color.filter((color) => color !== col)]);
  };
  //@ts-ignore
  const handleChangeColorPicker = (e) => {
    setColorPicker({ ...colorPicker, [e.target.name]: e.target.value });
  };
  const handleAddColor = () => {
    //@ts-ignore
    colorPicker && setProductColors([...productColors, colorPicker]);
    //@ts-ignore
    setColor([...color, colorPicker]);
  };
  const handleClickColor = (col: Color) => {
    const isColorSelected = colorSelected.some((code) => code == col.code);
    isColorSelected
      ? setColorSelected([...colorSelected.filter((code) => code !== col.code)])
      : //@ts-ignore
        setColorSelected([...colorSelected, col.code]);

    const isColor = color.some((color) => color == col);
    isColor
      ? setColor([...color.filter((color) => color !== col)])
      : setColor([...color, col]);
  };
  //@ts-ignore
  const handleChangeFile = (e) => {
    console.log(inputFileRef.current?.files);

    if (e.target.files.length > 0) {
      setIsSelected(true);
    } else setIsSelected(false);
  };
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
    let isValid = false;
    const validate = Object.values(product.category).map((it) => {
      if (it !== "") {
        isValid = true;
      }
    });

    if (isValid || product.category.all) {
      const response = await fetch("/api/auth/product", {
        method: "POST",
        body: JSON.stringify({ product, color }),
      });

      setProduct(initialProduct);
    } else {
      alert("please select a category for the product");
    }
  };
  const handleChangeProductCategory = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    console.log(product);
    const name = e.target.name;
    console.log(name);
    if (name == "Cabello")
      setProduct({
        ...product,
        category: {
          ...product.category,
          hair: product.category.hair !== "" ? "" : id,
        },
      });
    if (name == "Rostro")
      setProduct({
        ...product,
        category: {
          ...product.category,
          face: product.category.face !== "" ? "" : id,
        },
      });
    if (name == "Cejas y Pestañas")
      setProduct({
        ...product,
        category: {
          ...product.category,
          eyebrows: product.category.eyebrows !== "" ? "" : id,
        },
      });
    if (name == "Uñas")
      setProduct({
        ...product,
        category: {
          ...product.category,
          nails: product.category.nails !== "" ? "" : id,
        },
      });
  };
  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  //@ts-ignore
  const handleChangeColor = (e) => {
    setColor({ ...color, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function GetColors() {
      await fetch("/api/auth/color", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => setColorList(response.body));
    }
    GetColors();
  }, []);
  useEffect(() => {
    async function GetCategories() {
      await fetch("/api/auth/category", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => setCategories(response.body));
    }
    GetCategories();
  }, []);
  return (
    <div className="bg-violet-900 flex flex-col items-center">
      <h1 className="font-bold text-2xl text-slate-200">
        Subir foto del producto
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-2 border-gray-300 p-4 w-10/12 rounded-lg"
      >
        <input
          className="bg-black text-slate-200 p-8 rounded-md"
          name="file"
          ref={inputFileRef}
          onChange={handleChangeFile}
          type="file"
          required
        />
        {isSelected ? (
          <button
            type="submit"
            className="text-xl font-bold bg-black text-slate-200 rounded-md p-2 w-64 mb-6"
          >
            Subir imagen
          </button>
        ) : (
          <button
            type="button"
            className="text-xl font-bold bg-black text-slate-200 rounded-md p-2 w-64 mb-6"
          >
            Selecciona una imagen
          </button>
        )}
      </form>
      {url.length > 0 && (
        <div>
          <p className="text-xl font-bold pb-2">Vista previa</p>
          <div className="flex pb-4">
            {url.map((u, i) => (
              <div key={i}>
                {/*@ts-ignore*/}
                <img
                  src={u}
                  height={100}
                  width={100}
                  alt="image"
                  className="rounded-md"
                />
                {/* <p key={i}>{u}</p> */}
              </div>
            ))}
          </div>
          <button
            className="bg-black text-white font-bold p-2 rounded-md w-64"
            onClick={handleReset}
          >
            Reset Images
          </button>
        </div>
      )}
      <>
        <h1 className="text-2xl font-bold text-slate-200">Product details</h1>
        <form
          className="flex flex-col bg-violet-950 p-4 gap-[8px] mb-6 p-4 w-full"
          onSubmit={handleSubmitProduct}
        >
          <input
            className="rounded-md p-2 bg-gray-900 text-white outline-none"
            type="text"
            placeholder="name"
            name="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProduct(e)
            }
            value={product.name}
            required
          />
          <textarea
            className="rounded-md p-2 bg-gray-900 text-white resize-none outline-none"
            placeholder="description"
            name="description"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChangeProduct(e)
            }
            value={product.description}
            required
          ></textarea>
          <div className="flex">
            <div className=" flex flex-col border-r-2 border-slate-300 mr-4 pr-2 items-center">
              <label
                htmlFor="color-picker"
                className="text-md font-bold text-slate-300	"
              >
                Selecciona un nuevo color:
              </label>
              <input
                className="rounded-md mb-2 w-32 h-24 appearance-none border-none"
                type="color"
                name="code"
                id="color-picker"
                onChange={handleChangeColorPicker}
              />
              <label
                htmlFor="color-name"
                className="text-md font-bold mb-2 text-slate-300"
              >
                Nombre del color:
              </label>
              <input
                type="text"
                name="name"
                placeholder="color name"
                id="color-name"
                className="mb-4 bg-gray-900 text-white outline-none p-2 rounded-md"
                onChange={handleChangeColorPicker}
              />
              <button
                type="button"
                className="bg-black w-24 text-slate-200 p-2 rounded-md"
                onClick={handleAddColor}
              >
                Agregar
              </button>
              <div className="flex flex-wrap gap-2 overflow-auto w-32 h-32 justify-center">
                {productColors.map((col, i) => (
                  <div
                    className="flex flex-col items-center"
                    key={i}
                    onClick={() => handleColorPickerDelete(col)}
                  >
                    <div
                      key={i}
                      //@ts-ignore
                      style={{ backgroundColor: col.code }}
                      className="w-8 h-8 rounded-md mt-2 "
                    ></div>
                    {/* @ts-ignore */}
                    <p className="font-bold text-slate-200 mb-2">{col?.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="text-xl font-bold text-slate-300 bg-violet-950">
                O selecciona uno ya creado
              </p>
              <div className="ml-4 flex flex-wrap mt-8 h-48 overflow-auto">
                {colorList?.map((col, i) => (
                  <div className="flex flex-col items-center" key={i}>
                    <div
                      style={{ backgroundColor: col.code?.toString() }}
                      className={`w-20 h-20 mr-1 rounded-md ${
                        colorSelected.some((code) => code == col.code) &&
                        "border-4 border-black"
                      }`}
                      onClick={() => handleClickColor(col)}
                    ></div>
                    <p className="font-bold text-slate-200 mb-2">{col.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <input
            className="rounded-md p-2 bg-gray-900 text-white outline-none"
            type="text"
            placeholder="$1999.99"
            name="price"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProduct(e)
            }
            value={product.price}
            required
          />
          <input
            className="rounded-md p-2 bg-gray-900 text-white outline-none"
            type="text"
            placeholder="stock"
            name="itemsLeft"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeProduct(e)
            }
            value={product.itemsLeft}
            required
          />
          <div className="flex items-start gap-2">
            {categories &&
              categories?.map((cat, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <label
                    className="font-bold text-md text-slate-300 text-center h-12 flex items-center"
                    htmlFor="nails"
                  >
                    {cat.name}
                  </label>
                  <input
                    className="w-8 h-8 accent-gray-900 text-white"
                    type="checkbox"
                    name={cat.name?.toString()}
                    id={cat.name?.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeProductCategory(e, cat.id)
                    }
                  />
                </div>
              ))}
          </div>
          {url.length > 0 &&
          url.length == inputFileRef.current?.files?.length ? (
            <button
              className="bg-purple-700 text-white font-bold p-2 rounded-md w-64 self-center"
              type="submit"
            >
              Upload Product
            </button>
          ) : (
            <h1 className="text-2xl font-bold text-slate-200 mt-4 text-center">
              Porfavor sube una o mas imagenes para subir tu producto
            </h1>
          )}
        </form>
      </>
    </div>
  );
}

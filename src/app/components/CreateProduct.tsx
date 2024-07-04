"use client";
import { ConvertToCents, ConvertToLocalePrice } from "@/utils/convertion";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { deleteImageByURL } from "../../../fetchData";
import { useRouter } from "next/navigation";
import { useProductsAndCategories } from "../hooks/useFetchData";
interface Product {
  name: string | readonly string[] | number | undefined;
  description: string | readonly string[] | number | undefined;
  price: string;
  itemsLeft: string | readonly string[] | number | undefined;
  url: string[];
  category: {
    Cabello: string;
    Rostro: string;
    CejasyPestañas: string;
    Uñas: string;
    Todo: string;
  };
}
interface Color {
  id: string;
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
    Cabello: "",
    Rostro: "",
    CejasyPestañas: "",
    Uñas: "",
    Todo: "clwlq8bjn0000126bjghkwt9s",
  },
};
let urlImages: string[] = [];
export default function CreateProduct() {
  const router = useRouter();
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
  const [colorPicker, setColorPicker] = useState({
    name: "",
    code: "",
  });
  const { refetch } = useProductsAndCategories();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const UploadImage = async (file: File) => {
      const response = await fetch(`/api/auth/image?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      urlImages.push(newBlob.url);
      setUrl([...url, newBlob.url]);
    };
    const files = inputFileRef.current.files;
    Object.keys(files).forEach((key, i) => {
      const file = files[i];
      UploadImage(file);
    });
    setProduct({ ...product, url: urlImages });
    refetch();
  };
  const handleColorPickerDelete = (col: Color) => {
    setProductColors([...productColors.filter((color) => color !== col)]);
    setColor([...color.filter((color) => color !== col)]);
  };
  //@ts-ignore
  const handleChangeColorPicker = (e) => {
    setColorPicker({ ...colorPicker, [e.target.name]: e.target.value });
  };
  const handleAddColor = () => {
    if (!colorPicker.name || !colorPicker.code) return;
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

    const isColor = color.some((color) => color.code === col.code);
    isColor
      ? setColor([...color.filter((color) => color.code !== col.code)])
      : setColor([...color, col]);
  };
  //@ts-ignore
  const handleChangeFile = (e) => {
    if (e.target.files.length > 0) {
      setIsSelected(true);
    } else setIsSelected(false);
  };
  const handleDeleteImage = async (url: string) => {
    const deleted = await deleteImageByURL(url);
    urlImages = urlImages.filter((urlImage) => urlImage !== url);
    setProduct({ ...product, url: urlImages });
    setUrl(urlImages);
  };
  const handleReset = () => {
    setUrl([]);
    setProduct({ ...product, url: [] });
  };
  const handleSubmitProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = false;
    if (url.length === 0) return;
    if (isValid || product.category.Todo) {
      const response = await fetch("/api/auth/product", {
        method: "POST",
        body: JSON.stringify({ product, color }),
      });

      //reload page
      setProduct(initialProduct);
      setColor([]);
      setUrl([]);
      urlImages = [];
      if (inputFileRef.current?.value) {
        inputFileRef.current.value = "";
        setIsSelected(false);
      }
    } else {
      alert("please select a category for the product");
    }
  };
  const handleChangeProductCategory = (
    name: string | undefined,
    id: string
  ) => {
    if (name == "Cabello")
      setProduct({
        ...product,
        category: {
          ...product.category,
          Cabello: product.category.Cabello !== "" ? "" : id,
        },
      });
    if (name == "Rostro")
      setProduct({
        ...product,
        category: {
          ...product.category,
          Rostro: product.category.Rostro !== "" ? "" : id,
        },
      });
    if (name == "Cejas y Pestañas")
      setProduct({
        ...product,
        category: {
          ...product.category,
          CejasyPestañas: product.category.CejasyPestañas !== "" ? "" : id,
        },
      });
    if (name == "Uñas")
      setProduct({
        ...product,
        category: {
          ...product.category,
          Uñas: product.category.Uñas !== "" ? "" : id,
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
    <section>
      <form
        className="flex flex-col border-2 p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="image">Selecciona las fotos del producto</label>
        <input
          ref={inputFileRef}
          type="file"
          multiple
          name="image"
          id="image"
          className="w-full h-32 border-none font-bold border rounded-lg px-2 py-1"
          onChange={handleChangeFile}
        />
        {isSelected ? (
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-zinc-900 text-zinc-200 font-bold"
          >
            Subir imagenes
          </button>
        ) : (
          <div className="w-full p-2 rounded-lg bg-zinc-200 font-bold flex items-center justify-center">
            Selecciona una imagen
          </div>
        )}
      </form>
      <h2 className="font-bold text-sm">Vista previa</h2>
      <div className="grid grid-cols-2 border-2">
        {urlImages.map((url, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-2"
          >
            <div className="w-32 h-32 relative">
              <Image
                src={url}
                alt="product image"
                fill
                sizes="max-width(200px), 200px"
              />
            </div>
            <button
              className="bg-red-600 text-white w-full p-2 rounded font-bold my-2"
              onClick={() => handleDeleteImage(url)}
            >
              Eliminar imagen
            </button>
          </div>
        ))}
      </div>
      <form
        className="flex flex-col border-2 p-2"
        onSubmit={(e) => handleSubmitProduct(e)}
      >
        <label htmlFor="name" className="text-md font-bold">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full border rounded-lg px-2 py-1"
          onChange={(e) => handleChangeProduct(e)}
          value={product.name}
          required
        />
        <label htmlFor="description" className="text-md font-bold">
          Descripción
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="w-full border rounded-lg px-2 py-1"
          onChange={(e) => handleChangeProduct(e)}
          required
          value={product.description}
        />
        <label htmlFor="price" className="text-md font-bold">
          Precio
        </label>
        <input
          type="text"
          name="price"
          id="price"
          className="w-full border rounded-lg px-2 py-1"
          onChange={(e) => handleChangeProduct(e)}
          required
          value={product.price}
        />
        <label htmlFor="stock" className="text-md font-bold">
          Stock
        </label>
        <input
          type="number"
          name="itemsLeft"
          id="stock"
          className="w-full border rounded-lg px-2 py-1"
          onChange={(e) => handleChangeProduct(e)}
          required
          value={product.itemsLeft}
        />
        <h2 className="font-bold text-md">Color/es</h2>
        <div className="w-full bg-zinc-200 rounded-lg p-2 flex flex-col">
          <p className="font-bold text-xs mb-2">Colores previamente creados</p>
          <div className="flex gap-2 flex-wrap">
            {colorList?.map((color, i) => (
              <div
                key={i}
                className={`flex w-20 h-auto items-center justify-center flex-col`}
                onClick={() =>
                  handleClickColor({
                    id: color.id,
                    name: color.name,
                    code: color.code,
                  })
                }
              >
                <div
                  className={`w-10 h-10 rounded-md ${
                    colorSelected.some((code) => code == color.code) &&
                    "border-4 border-black"
                  }`}
                  style={{ backgroundColor: color.code?.toString() }}
                ></div>
                <p className="font-bold text-xs">{color.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex gap-2 bg-zinc-200 rounded-lg p-4 my-2">
          <div>
            <label htmlFor="color" className="text-md font-bold">
              Crear color
            </label>
            <input
              type="color"
              name="code"
              id="color"
              className="w-full h-24 border rounded-lg border-none rounded-md bg-transparent outline-none"
              onChange={handleChangeColorPicker}
            />
            <button
              className="w-full p-2 rounded-lg bg-zinc-900 text-zinc-200 font-bold my-4"
              type="button"
              onClick={handleAddColor}
            >
              Crear color
            </button>
          </div>
          <div>
            <label htmlFor="ColorName" className="text-md font-bold">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="ColorName"
              className="w-full border rounded-md py-1 pl-2 outline-none"
              onChange={handleChangeColorPicker}
            />
          </div>
        </div>
        <p className="text-md font-bold">Colores seleccionados</p>

        <div className="w-full bg-zinc-200 rounded-lg p-2 flex flex-col">
          <div className="flex gap-2 flex-wrap">
            {color?.map((color, i) => (
              <div
                key={i}
                className="flex w-20 h-auto items-center justify-center flex-col"
                onClick={() => handleClickColor(color)}
              >
                <div
                  className="w-10 h-10 bg-zinc-900 rounded-md"
                  style={{ backgroundColor: color.code?.toString() }}
                ></div>
                <p className="font-bold text-xs">{color.name}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-bold text-md">Categorias</h2>
        <div className="w-full bg-white rounded-lg p-2 flex flex-col gap-2">
          {categories?.map(
            (category, i) =>
              category.name !== "Todo" && (
                <div
                  onClick={() =>
                    handleChangeProductCategory(category.name, category.id)
                  }
                  key={i}
                  className={`w-full bg-zinc-200 rounded-lg p-2 flex items-center  ${
                    // @ts-ignore
                    product.category[category.name?.split(" ").join("")] !==
                      "" && "border-4 border-zinc-800"
                  } `}
                >
                  <p className="font-bold text-xs text-zinc-900">
                    {category.name}
                  </p>
                </div>
              )
          )}
        </div>
        {url.length == 0 ? (
          <div className="w-full p-2 rounded-lg bg-zinc-400 text-zinc-900 font-bold my-4 text-center">
            Sube una imagen
          </div>
        ) : product.category.Cabello == "" &&
          product.category.Rostro == "" &&
          product.category.CejasyPestañas == "" &&
          product.category.Uñas == "" ? (
          <div className="w-full p-2 rounded-lg bg-zinc-400 text-zinc-900 font-bold my-4 text-center">
            Selecciona una categoria
          </div>
        ) : (
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-zinc-900 text-zinc-200 font-bold my-4"
          >
            Crear producto
          </button>
        )}
      </form>
    </section>
  );
}

"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface Category {
  name: string | readonly string[] | number | undefined;
  description: string | readonly string[] | number | undefined;
}

const initialCategory: Category = {
  name: "",
  description: "",
};

export default function AvatarUploadPage() {
  const [category, setCategory] = useState(initialCategory);

  const handleSubmitCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = fetch("/api/auth/category", {
      method: "POST",
      body: JSON.stringify(category),
    });
    setCategory(initialCategory);
  };

  const handleChangeCategory = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <>
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
      <button
        type="button"
        className="text-white bg-black font-xl font-bold rounded-lg w-64 p-2 mt-2"
      >
        delete
      </button>
    </>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
const AddItemCounter = () => {
  const [counter, setCounter] = useState(0);
  const params = useSearchParams();
  const handleChange = (cant: number) => {
    const searchParams = new URLSearchParams(params.toString());
    const actualCount = parseInt(searchParams.get("count") || "0");
    searchParams.set("count", actualCount.toString());
    setCounter(actualCount);
    if (actualCount + cant > 0) {
      searchParams.set("count", String(actualCount + cant));
      setCounter(counter + cant);
    } else {
      searchParams.delete("count");
      setCounter(0);
    }
    //thisis beacause replace or push rerenders the page multiple times
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };
  return (
    <div className="flex w-full h-16 gap-2 md:w-64">
      <button
        className={"bg-pink text-white w-16 rounded font-bold"}
        onClick={() => handleChange(-1)}
        type="button"
      >
        -
      </button>
      <div className="w-24 text-center bg-zinc-400 rounded flex justify-center items-center">
        {counter}
      </div>
      <button
        className={"bg-pink text-white w-16 rounded font-bold"}
        onClick={() => handleChange(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default AddItemCounter;

"use client";

import { Color } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ButtonColor = ({ colors }: { colors: Color[] }) => {
  const params = useSearchParams();
  const [color, setColor] = useState(params.get("color") || "");
  const handleColorChange = (col: string) => {
    const searchParams = new URLSearchParams(params);
    if (col !== color) {
      searchParams.set("color", col);
      setColor(col);
    } else {
      searchParams.delete("color");
      setColor("");
    }
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };
  return colors.map((col, i) => {
    return (
      <div className="flex flex-col items-center my-2" key={i}>
        <button
          className={` w-8 h-8 rounded-full border-2 ${
            col.code == color && "border-fuchsia-600"
          }`}
          style={{ backgroundColor: col.code }}
          onClick={() => handleColorChange(col.code)}
        ></button>
        <p className="text-sm font-bold">{col.name}</p>
      </div>
    );
  });
};

export default ButtonColor;

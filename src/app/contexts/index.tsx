"use client";

import { createContext, useContext, useEffect, useState } from "react";
interface Cart {
  id: number;
  count: number;
  color: string;
}
const AppContext = createContext();
const initialCart: Cart = { id: -1, count: -1, color: "white" };

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load data from local storage on component mount
    console.log("asdasd");
    const savedData = localStorage.getItem("myData");
    if (savedData) {
      console.log("qweqwe");
      setCart(JSON.parse(savedData));
    }
  }, []);

  const [cart, setCart] = useState<Array<Cart>>([]);
  const handleAddToCart = (product: Cart) => {
    let newCart = [...cart];
    let alreadyExist = false;
    cart.length > 0 &&
      cart.forEach((item, i) => {
        if (item.id == product.id && item.color == product.color) {
          newCart[i] = { ...newCart[i], count: item.count + product.count };
          setCart(newCart);
          alreadyExist = true;
          return;
        }
      });
    newCart = [...newCart, product];
    if (cart.length == 0 || !alreadyExist) setCart(newCart);
    localStorage.setItem("myData", JSON.stringify(newCart));
  };
  return (
    <AppContext.Provider value={{ cart, setCart, handleAddToCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

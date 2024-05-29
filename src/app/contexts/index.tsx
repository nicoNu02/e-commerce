"use client";

import { Cart } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string | null;
}

interface AppContextValue {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  handleAddToCart: (product: Cart) => void;
  handleDeleteFromCart: (product: Cart) => void;
}
const AppContext = createContext<AppContextValue | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = localStorage.getItem("myData");
    if (savedData) {
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
        return;
      });
    if (cart.length == 0 || !alreadyExist) {
      newCart = [...newCart, product];
      setCart(newCart);
    }
    localStorage.setItem("myData", JSON.stringify(newCart));
  };

  const handleDeleteFromCart = (product: Cart) => {
    let newCart = [...cart];
    const filteredItems = newCart.filter(
      (prod) => prod.id !== product.id && prod.color !== product.color
    );
    setCart(filteredItems);
    localStorage.setItem("myData", JSON.stringify(filteredItems));
  };
  return (
    <AppContext.Provider
      value={{ cart, setCart, handleAddToCart, handleDeleteFromCart }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

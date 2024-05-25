"use client";

import { createContext, useContext, useEffect, useState } from "react";
interface Cart {
  id: string;
  count: number;
  color: string;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
}

interface AppContextValue {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  handleAddToCart: (product: Cart) => void;
}
const AppContext = createContext<AppContextValue | undefined>(undefined);
const initialCart: Cart = { id: "", count: -1, color: "white" };

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
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

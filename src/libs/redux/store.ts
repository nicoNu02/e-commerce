import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import orders from "./reducers/orders";
import images from "./reducers/images";
import categories from "./reducers/categories";
export const makeStore = () => {
  return configureStore({
    reducer: {
      products,
      orders,
      images,
      categories,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

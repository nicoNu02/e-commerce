import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getAllProductsByCategory,
  searchProductByName,
  setSelectedProduct,
} from "../../actions/products";
import { ProductType } from "@/types/types";
interface ProductState {
  products: ProductType[];
  productsByCategory: ProductType[];
  selectedProduct: ProductType | null;
  productSearchResuls: ProductType[];
  loadingGetAllProducts: boolean;
  loadingGetAllProductsCategory: boolean;
  loadingSearchProducts: boolean;
  errorGetAllProducts: string | null;
  errorGetAllProductsCategory: string | null;
  errorSearchProducts: string | null;
}
const initialState: ProductState = {
  products: [],
  productsByCategory: [],
  selectedProduct: null,
  productSearchResuls: [],
  loadingGetAllProducts: false,
  loadingSearchProducts: false,
  loadingGetAllProductsCategory: false,
  errorGetAllProducts: null,
  errorGetAllProductsCategory: null,
  errorSearchProducts: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loadingGetAllProducts = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingGetAllProducts = false;

        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loadingGetAllProducts = false;

        state.errorGetAllProducts = action.error.message ?? "Unknown error";
      })
      .addCase(getAllProductsByCategory.pending, (state) => {
        state.loadingGetAllProductsCategory = true;
      })
      .addCase(getAllProductsByCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingGetAllProductsCategory = false;

        state.productsByCategory = action.payload;
      })
      .addCase(getAllProductsByCategory.rejected, (state, action) => {
        state.loadingGetAllProductsCategory = false;

        state.errorGetAllProductsCategory =
          action.error.message ?? "Unknown error";
      })
      .addCase(searchProductByName.pending, (state) => {
        state.loadingSearchProducts = true;
      })
      .addCase(searchProductByName.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingSearchProducts = false;
        state.productSearchResuls = action.payload;
      })
      .addCase(searchProductByName.rejected, (state, action) => {
        state.errorSearchProducts = action.error.message ?? "Unknown error";
        state.loadingSearchProducts = false;
      })
      .addCase(setSelectedProduct, (state, action) => {
        console.log(action.payload);
        const prod = state.products.find(
          (product) => product.id === action.payload
        );
        state.selectedProduct = prod ?? null;
      });
  },
});

export default productsSlice.reducer;

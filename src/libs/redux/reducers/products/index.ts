import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSelectedProduct,
  getAllProducts,
  getAllProductsByCategory,
  searchProductByName,
  setSelectedProduct,
} from "../../actions/products";
import { GetProductsByCategoryResponse, ProductType } from "@/types/types";
import { RootState } from "../../store";
interface ProductState {
  products: ProductType[];
  productsByCategory: GetProductsByCategoryResponse[];
  selectedProduct: ProductType | null;
  productSearchResuls: ProductType[];
  loadingGetAllProducts: boolean;
  loadingGetAllProductsCategory: boolean;
  loadingSearchProducts: boolean;
  loadingFetchSelectedProduct: boolean;
  errorGetAllProducts: string | null;
  errorGetAllProductsCategory: string | null;
  errorSearchProducts: string | null;
  errorFetchSelectedProduct: string | null;
}
const initialState: ProductState = {
  products: [],
  productsByCategory: [],
  selectedProduct: null,
  productSearchResuls: [],
  loadingGetAllProducts: false,
  loadingSearchProducts: false,
  loadingGetAllProductsCategory: false,
  loadingFetchSelectedProduct: false,
  errorGetAllProducts: null,
  errorGetAllProductsCategory: null,
  errorSearchProducts: null,
  errorFetchSelectedProduct: null,
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
        console.log(action.payload, "AAAAAAAAAAAAAAAA");
        console.log(current(state.products), "EEEEEEEEEEEEEEEEEE");

        const prod = state.products.find(
          (product) => product.id === action.payload
        );
        console.log(current(state.products), "AAAAAAAAAAAAAAAA");
        console.log(prod, "BBBBBBBBBBBBBBBBBB");
        state.selectedProduct = prod ?? null;
      })
      .addCase(fetchSelectedProduct.pending, (state) => {
        state.selectedProduct = null;
        state.loadingFetchSelectedProduct = true;
      })
      .addCase(fetchSelectedProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        console.log(action.payload, "AAAAAAAAAAAAAAAAAAAAAAAA");
        state.loadingFetchSelectedProduct = false;
      })
      .addCase(fetchSelectedProduct.rejected, (state, action) => {
        state.errorFetchSelectedProduct =
          action.error.message ?? "Unknown error";
      });
  },
});
export const productState = (state: RootState) => state.products;

export default productsSlice.reducer;

import { apiService } from "@/axios";
import { ProductType } from "@/types/types";
import { Product } from "@prisma/client";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk<
  ProductType[],
  undefined,
  { rejectValue: { message: string } }
>("products/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get("/product");
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: "Error loading areas" });
    }
    throw error;
  }
});

export const getAllProductsByCategory = createAsyncThunk<
  ProductType[],
  { categoryId: string },
  { rejectValue: { message: string } }
>(
  "products/getAllProductsByCategory",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/product?category=${categoryId}`);
      return response.data.body;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({ message: "Error loading areas" });
      }
      throw error;
    }
  }
);

export const setSelectedProduct = createAction(
  "products/setSelectedProduct",
  ({ id }: { id: string }) => {
    return {
      payload: id,
    };
  }
);

export const searchProductByName = createAsyncThunk<
  ProductType[],
  { name: string },
  { rejectValue: { message: string } }
>("products/searchProductByName", async ({ name }, { rejectWithValue }) => {
  try {
    const response = await apiService.get(`/product?name=${name}`);
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: "Error loading areas" });
    }
    throw error;
  }
});

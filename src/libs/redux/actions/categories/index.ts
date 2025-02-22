import { apiService } from "@/axios";
import { Category } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: { message: string } }
>("categories/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get(`/category`);
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: "Error loading categories" });
    }
    throw error;
  }
});

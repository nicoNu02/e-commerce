import { apiService } from "@/axios";
import { Order } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk<
  Order[],
  { name: string; lastName: string },
  { rejectValue: { message: string } }
>("orders/getAllOrders", async ({ name, lastName }, { rejectWithValue }) => {
  try {
    const response = await apiService.get(
      `/order?name=${name}&lastName=${lastName}`
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: "Error loading orders" });
    }
    throw error;
  }
});

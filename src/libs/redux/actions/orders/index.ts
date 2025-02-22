import { apiService } from "@/axios";
import { Cart, FormCheckout, Method, ProductType } from "@/types/types";
import { Order } from "@prisma/client";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
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

export const setCart = createAction<Cart[]>("orders/setCart");

export const createOrder = createAction<FormCheckout>("orders/createOrder");

export const setMethod = createAction<Method>("orders/setMethod");

export const addTocart = createAction<Cart>("orders/addToCart");

export const deleteFromCart = createAction<Cart>("orders/deleteFromCart");

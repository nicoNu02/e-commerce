import { apiService } from "@/axios";
import { Order } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteImageByUrl = createAsyncThunk<
  null,
  { url: string },
  { rejectValue: { message: string } }
>("images/deleteIamgeByUrl", async ({ url }, { rejectWithValue }) => {
  try {
    const response = await apiService.get(`/image?url=${url}`);
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: "Error Deleting Image" });
    }
    throw error;
  }
});

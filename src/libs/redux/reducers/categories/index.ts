import { createSlice } from "@reduxjs/toolkit";
import { Category, Order } from "@prisma/client";
import { getAllCategories } from "../../actions/categories";
import { RootState } from "../../store";
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error?: string;
}
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: undefined,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const categoryState = (state: RootState) => state.categories;

export default categoriesSlice.reducer;

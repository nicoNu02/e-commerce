import { createSlice } from "@reduxjs/toolkit";
import { deleteImageByUrl } from "../../actions/images";
import { RootState } from "../../store";
interface ImageState {
  loading: boolean;
  error?: string;
}
const initialState: ImageState = {
  loading: false,
  error: undefined,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteImageByUrl.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteImageByUrl.fulfilled, (state, action) => {})
      .addCase(deleteImageByUrl.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const imageState = (state: RootState) => state.images;

export default imageSlice.reducer;

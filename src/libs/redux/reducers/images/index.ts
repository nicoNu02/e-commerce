import { createSlice } from "@reduxjs/toolkit";
import { deleteImageByUrl } from "../../actions/images";
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
      .addCase(deleteImageByUrl.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteImageByUrl.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;

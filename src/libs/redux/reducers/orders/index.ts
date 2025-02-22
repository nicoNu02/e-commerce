import { createSlice } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";
import { getAllOrders } from "../../actions/orders";
interface OrderState {
  orders: Order[];
  loading: boolean;
  error?: string;
}
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: undefined,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;

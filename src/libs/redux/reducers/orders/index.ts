import { createSlice } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";
import {
  addTocart,
  createOrder,
  deleteFromCart,
  getAllOrders,
  setCart,
  setMethod,
} from "../../actions/orders";
import { Cart, FormCheckout, Method, ProductType } from "@/types/types";
import { RootState } from "../../store";
import { methods } from "@/app/constants";
interface OrderState {
  orders: Order[];
  orderForm: FormCheckout;
  method: Method;
  cart: Cart[];
  loading: boolean;
  error?: string;
}
const initialState: OrderState = {
  orders: [],
  orderForm: {
    shipping: {
      email: "",
      name: "",
      lastName: "",
      dni: "",
      phoneNumber: "",
      address: "",
      houseNumber: "",
      floor: "",
      city: "",
      apartment: "",
      province: "",
      shippingId: -1,
      shippingMethod: "",
      shippingDetails: "",
      shippingPrice: undefined,
    },

    payment: {
      paymentMethod: "",
      totalPrice: undefined,
    },
    notes: "",
    stage: "",
    paid: false,
    complete: false,
  },
  method: methods[0],
  cart: [],
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
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder, (state, action) => {
        state.orderForm = action.payload;

        localStorage.setItem(
          "myData",
          JSON.stringify({
            cart: state.cart,
            method: state.method,
            formCheckout: action.payload,
          })
        );
        console.log(state.orderForm, "AAAAAA");
      })
      .addCase(setMethod, (state, action) => {
        console.log(action.payload);
        state.method = action.payload;
        localStorage.setItem(
          "myData",
          JSON.stringify({
            cart: state.cart,
            method: action.payload,
            formCheckout: state.orderForm,
          })
        );
      })
      .addCase(addTocart, (state, action) => {
        console.log(action.payload, "PAYLOAD");

        const cartCopy = [...state.cart];
        let alreadyExist = false;
        cartCopy.length > 0 &&
          cartCopy.forEach((item, i) => {
            if (
              item.id === action.payload.id &&
              item.color.name === action.payload.color.name
            ) {
              cartCopy[i] = {
                ...cartCopy[i],
                count: item.count + action.payload.count,
              };
              alreadyExist = true;
              return;
            }
            return;
          });
        if (cartCopy.length == 0 || !alreadyExist) {
          cartCopy.push(action.payload);
        }
        state.cart = cartCopy;
        console.log(state.cart, "UPDATEd");
        localStorage.setItem(
          "myData",
          JSON.stringify({
            cart: cartCopy,
            method: state.method,
            formCheckout: state.orderForm,
          })
        );
      })
      .addCase(setCart, (state, action) => {
        console.log(action.payload);
        state.cart = action.payload;
        localStorage.setItem(
          "myData",
          JSON.stringify({
            cart: action.payload,
            method: state.method,
            formCheckout: state.orderForm,
          })
        );
      })
      .addCase(deleteFromCart, (state, action) => {
        console.log(action.payload, "PAYLOAD");
        const filteredItems = state.cart.filter(
          (prod) =>
            prod.id !== action.payload.id ||
            prod.color.name !== action.payload.color.name
        );
        state.cart = filteredItems;
        console.log(state.cart, "FILTERED");
        localStorage.setItem(
          "myData",
          JSON.stringify({
            cart: filteredItems,
            method: state.method,
            formCheckout: state.orderForm,
          })
        );
      });
  },
});
export const orderState = (state: RootState) => state.orders;
export default ordersSlice.reducer;

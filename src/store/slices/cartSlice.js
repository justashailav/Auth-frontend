import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    message: null,
    cartItems: [],
  },
  reducers: {
    addToCart(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    addToCartSuccess(state, action) {
      (state.loading = false), (state.message = action.payload);
    },
    addToCartFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    getCart(state) {
      (state.loading = true), (state.error = null);
    },
    getCartSuccess(state, action) {
      (state.loading = false), (state.cartItems = action.payload);
    },
    getCartFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const addToCart = (data) => async (dispatch) => {
  dispatch(cartSlice.actions.addToCart());
  await axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/add-cart`, data, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(cartSlice.actions.addToCartSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        cartSlice.actions.addToCartFailed(error.response.data.message)
      );
    });
};

export const getCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.getCart());
  await axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/getCart`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(cartSlice.actions.getCartSuccess(res.data.cart));
    })
    .catch((error) => {
      dispatch(cartSlice.actions.getCartFailed(error.response.data.message));
    });
};

export default cartSlice.reducer;
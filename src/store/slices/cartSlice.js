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
    getCartItems(state) {
      (state.loading = true), (state.error = null);
    },
    getCartItemsSuccess(state, action) {
      (state.loading = false), (state.cartItems = action.payload);
    },
    getCartItemsFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const addCart = (product) => async (dispatch) => {
  try {
    dispatch(cartSlice.actions.addToCart());

    const payload = {
      productId: product._id, 
      quantity: 1,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/add-cart`,
      payload,
      { withCredentials: true }
    );

    dispatch(cartSlice.actions.addToCartSuccess(res.data.cart.items));
  } catch (error) {
    dispatch(
      cartSlice.actions.addToCartFailed(
        error?.response?.data?.message || "Add to cart failed"
      )
    );
  }
};

export const getCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.getCartItems());
  await axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/getCart`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(cartSlice.actions.getCartItemsSuccess(res.data.cart.items));
    })
    .catch((error) => {
      dispatch(cartSlice.actions.getCartItemsFailed(error.response.data.message));
    });
};

export default cartSlice.reducer;
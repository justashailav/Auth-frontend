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
      (state.loading = false), (state.message = action.payload), (state.cartItems = action.payload);
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
        updateCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateCartSuccess(state, action) {
      state.loading = false;
      state.cartItems = action.payload;
    },
    updateCartFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // 🗑️ REMOVE ITEM
    removeCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeCartSuccess(state, action) {
      state.loading = false;
      state.cartItems = action.payload;
    },
    removeCartFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
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
export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    dispatch(cartSlice.actions.updateCartStart());

    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/update-cart`,
      { productId, quantity },
      { withCredentials: true }
    );

    dispatch(cartSlice.actions.updateCartSuccess(res.data.cart.items));
  } catch (error) {
    dispatch(
      cartSlice.actions.updateCartFailed(
        error?.response?.data?.message || "Update cart failed"
      )
    );
  }
};
export const removeCartItem = (productId) => async (dispatch) => {
  try {
    dispatch(cartSlice.actions.removeCartStart());

    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/remove-cart/${productId}`,
      { withCredentials: true }
    );

    dispatch(cartSlice.actions.removeCartSuccess(res.data.cart.items));
  } catch (error) {
    dispatch(
      cartSlice.actions.removeCartFailed(
        error?.response?.data?.message || "Remove item failed"
      )
    );
  }
};

export default cartSlice.reducer;
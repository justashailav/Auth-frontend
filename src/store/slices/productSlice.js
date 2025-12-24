import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    message: null,
    productList: [],
  },
  reducers: {
    addProduct(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    addProductSuccess(state, action) {
      (state.loading = false), (state.message = action.payload);
    },
    addProductFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    getAllProducts(state) {
      (state.loading = true), (state.error = null);
    },
    getAllProductsSuccess(state, action) {
      (state.loading = false), state.productList = action.payload;
    },
    getAllProductsFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
  },
});
export const addProduct = (data) => async (dispatch) => {
  dispatch(productSlice.actions.addProduct());
  await axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/product/create-product`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(productSlice.actions.addProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productSlice.actions.addProductFailed(error.response.data.message)
      );
    });
};

export const getAllProducts = (data) => async (dispatch) => {
  dispatch(productSlice.actions.getAllProducts());
  await axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getAllProducts`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(productSlice.actions.getAllProductsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productSlice.actions.getAllProductsFailed(error.response.data.message)
      );
    });
};
export default productSlice.reducer;
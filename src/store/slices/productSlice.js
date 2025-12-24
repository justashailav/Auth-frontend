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
      (state.loading = false), (state.productList = action.payload);
    },
    getAllProductsFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    updateProduct(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;

      const index = state.productList.findIndex(
        (p) => p._id === action.payload.product._id
      );
      if (index !== -1) {
        state.productList[index] = action.payload.product;
      }
    },
    updateProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProduct(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;

      state.productList = state.productList.filter(
        (p) => p._id !== action.payload.id
      );
    },
    deleteProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
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

export const getAllProducts = () => async (dispatch) => {
  dispatch(productSlice.actions.getAllProducts());
  await axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getAllProducts`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(productSlice.actions.getAllProductsSuccess(res.data.products));
    })
    .catch((error) => {
      dispatch(
        productSlice.actions.getAllProductsFailed(error.response.data.message)
      );
    });
};

export const updateProduct = (data, id) => async (dispatch) => {
  dispatch(productSlice.actions.updateProduct());
  await axios
    .put(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/product/update-product/${id}`,
      data,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch(productSlice.actions.updateProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productSlice.actions.updateProductFailed(error.response.data.message)
      );
    });
};
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productSlice.actions.deleteProduct());
  await axios
    .delete(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/product/create-product/${id}`,
      data,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch(productSlice.actions.deleteProductSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        productSlice.actions.deleteProductFailed(error.response.data.message)
      );
    });
};
export default productSlice.reducer;

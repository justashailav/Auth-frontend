import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    message: null,
    orders: [],
    currentOrder: null,
    razorpayOrder: null,
  },
  reducers: {
    createOrderStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.currentOrder = action.payload.order;
      state.razorpayOrder = action.payload.razorpayOrder || null;
      state.message = "Order created successfully";
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    verifyPaymentStart(state) {
      state.loading = true;
      state.error = null;
    },
    verifyPaymentSuccess(state, action) {
      state.loading = false;
      state.currentOrder = action.payload;
      state.message = "Payment successful";
    },
    verifyPaymentFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const createOrder = (data) => async (dispatch) => {
  try {
    dispatch(orderSlice.actions.createOrderStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/order/create`,
      data,
      { withCredentials: true }
    );

    dispatch(orderSlice.actions.createOrderSuccess(res.data));
    return res.data; 
  } catch (error) {
    dispatch(
      orderSlice.actions.createOrderFail(
        error?.response?.data?.message || "Order creation failed"
      )
    );
    throw error;
  }
};
export const verifyRazorpayPayment = (data) => async (dispatch) => {
  try {
    dispatch(orderSlice.actions.verifyPaymentStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/order/verify-payment`,
      data,
      { withCredentials: true }
    );

    dispatch(orderSlice.actions.verifyPaymentSuccess(res.data.order));
    return res.data.order; 
  } catch (error) {
    dispatch(
      verifyPaymentFail(
        error?.response?.data?.message || "Payment verification failed"
      )
    );
  }
};
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch(orderSlice.actions.getOrdersStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/order/my-orders`,
      { withCredentials: true }
    );

    dispatch(orderSlice.actions.getOrdersSuccess(res.data.orders));
  } catch (error) {
    dispatch(
      getOrdersFail(
        error?.response?.data?.message || "Failed to fetch orders"
      )
    );
  }
};


export default orderSlice.reducer;
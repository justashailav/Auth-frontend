import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    error: null,
    message: null,
    addresses: [],
    selectedAddress:null
  },
  reducers: {
    addressStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addressSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
    },

    addressFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    selectAddress(state, action) {
      state.selectedAddress = action.payload;
    },
    getAddressesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAddressesSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
    },
    getAddressesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateAddressStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateAddressSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
      state.message = "Address updated successfully";
    },
    updateAddressFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAddressStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteAddressSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
      state.message = "Address deleted successfully";
    },
    deleteAddressFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const addAddress = (data) => async (dispatch) => {
  try {
    dispatch(addressSlice.actions.addressStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/address/add`,
      data,
      { withCredentials: true }
    );

    dispatch(addressSlice.actions.addressSuccess(res.data.addresses));
  } catch (error) {
    dispatch(
      addressSlice.actions.addressFail(
        error?.response?.data?.message || "Add address failed"
      )
    );
  }
};
export const getAddresses = () => async (dispatch) => {
  try {
    dispatch(addressSlice.actions.getAddressesStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/address/get`,
      { withCredentials: true }
    );

    dispatch(addressSlice.actions.getAddressesSuccess(res.data.addresses));
  } catch (error) {
    dispatch(
      addressSlice.actions.getAddressesFail(
        error?.response?.data?.message || "Failed to fetch addresses"
      )
    );
  }
};

export const updateAddress = (id, data) => async (dispatch) => {
  try {
    dispatch(addressSlice.actions.updateAddressStart());

    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/address/update/${id}`,
      data,
      { withCredentials: true }
    );

    dispatch(addressSlice.actions.updateAddressSuccess(res.data.addresses));
  } catch (error) {
    dispatch(
      addressSlice.actions.updateAddressFail(
        error?.response?.data?.message || "Update address failed"
      )
    );
  }
};
export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch(addressSlice.actions.deleteAddressStart());

    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/address/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(addressSlice.actions.deleteAddressSuccess(res.data.addresses));
  } catch (error) {
    dispatch(
      addressSlice.actions.deleteAddressFail(
        error?.response?.data?.message || "Delete address failed"
      )
    );
  }
  
};
export const { selectAddress } = addressSlice.actions;
export default addressSlice.reducer;

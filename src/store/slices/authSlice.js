import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthencated: false,
  },
  reducers: {
    register(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    registerSuccess(state, action) {
      (state.loading = false), (state.message = action.payload.message);
    },
    registerFailed(state, action) {
      (state.loading = false), (state.error = action.payload)
    },
    otpVerification(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    otpVerificationSuccess(state, action) {
      (state.loading = false),
      (state.message = action.payload.message),
      (state.isAuthencated = true),
      (state.user = action.payload.user);
    },
    otpVerificationFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    resetAuthSlice(state) {
      (state.error = null),
      (state.loading = false),
      (state.message = null),
      (state.user = state.user),
      (state.isAuthencated = state.isAuthencated);
    },
    login(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    loginSuccess(state, action) {
      (state.loading = false),
      (state.message = action.payload.message),
      (state.isAuthencated = true),
      (state.user = action.payload.user);
    },
    loginFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    forgotPassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    forgotPasswordSuccess(state, action) {
      (state.loading = false), (state.message = action.payload);
    },
    forgotPasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    resetPassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    resetPasswordSuccess(state, action) {
      (state.loading = false),
      (state.message = action.payload.message),
      (state.user = action.payload.user),
      (state.isAuthencated = true);
    },
    resetPasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    updatePassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    updatePasswordSuccess(state, action) {
      (state.loading = false), (state.message = action.payload.message);
    },
    updatePasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload?.message || "Logged out successfully";
      state.isAuthencated = false;
      state.user = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload || "Logout failed";
    },
    resetAuthSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.user = null;
      state.isAuthencated = false;
    },
  },
});
export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};
export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.register());
  await axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response.data.message));
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerification());
  await axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verify-otp`,
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data.message));
    })
    .catch((error) => {
      console.error(
        "OTP Verification Failed:",
        error.response?.data || error.message
      );
      dispatch(
        authSlice.actions.otpVerificationFailed(error.response.data.message)
      );
    });
};
export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.login());
  await axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch(authSlice.actions.loginSuccess(res.data.message));
      return res.data;
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(error.response.data.message));
    });
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPassword());
  await axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.forgotPasswordFailed(error.response.data.message)
      );
    });
};
export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPassword());
  await axios
    .put(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/user/password/reset/${token}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.resetPassword(error.response.data.message));
    });
};
export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePassword());
  await axios
    .put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/password/update`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    });
};
export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutStart());
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`,
      {
        withCredentials: true,
      }
    );
    dispatch(authSlice.actions.logoutSuccess(res.data));
  } catch (error) {
    dispatch(
      authSlice.actions.logoutFailed(
        error.response?.data?.message || "Logout failed"
      )
    );
  }
};

export default authSlice.reducer;

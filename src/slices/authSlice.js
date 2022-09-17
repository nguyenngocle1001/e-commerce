import { createSelector, createSlice } from "@reduxjs/toolkit";
import { AUTH } from "constants/props";
import localStorageServices from "utils/localStorageServices";

export const ROOT_STATE_NAME = "auth";

const initialState = {
  [AUTH.login]: {
    status: "idle",
    data: localStorageServices.get("auth") || {},
    error: "",
  },

  [AUTH.signup]: {
    status: "idle",
    data: {},
    error: "",
  },
  [AUTH.forgotPassword]: {
    status: "idle",
    data: {},
    error: "",
  },
  [AUTH.resetPassword]: {
    status: "idle",
    data: {},
    error: "",
  },
};

const authSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    authPostRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    authGetMessageRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    authSuccess: (state, action) => {
      state[action.payload.prop] = {
        status: "success",
        data: action.payload.data,
        error: "",
      };
    },
    authFailure: (state, action) => {
      state[action.payload.prop].status = "failure";
      state[action.payload.prop].error = action.payload.error;
    },
    authClear: (state, action) => {
      state[action.payload.prop] = { status: "idle", data: {}, error: "" };
    },
  },
});

export const {
  authPostRequest,
  authGetMessageRequest,
  authSuccess,
  authFailure,
  authLogin,
  authClear,
} = authSlice.actions;
export default authSlice.reducer;

const rootSelector = (state) => state[ROOT_STATE_NAME] || {};
export const authByPropSelector = (prop) =>
  createSelector(rootSelector, (state) => state[prop]);

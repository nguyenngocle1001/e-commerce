import { createSlice, createSelector } from "@reduxjs/toolkit";
import { DETAIL } from "constants/props";

export const ROOT_STATE_NAME = "detail";
const initialState = {
  [DETAIL.product]: {
    status: "idle",
    data: {},
    error: "",
  },
  [DETAIL.options]: {
    status: "idle",
    data: {},
    error: "",
  },
};

const detailProductSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    detailGetRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    detailManyGetRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    detailSuccess: (state, action) => {
      const { prop, data } = action.payload;

      state[prop] = {
        status: "success",
        data,
        error: "",
      };
    },
    detailFailure: (state, action) => {
      const { prop, error } = action.payload;

      state[prop] = {
        status: "failure",
        error,
      };
    },
  },
});

export const {
  detailGetRequest,
  detailManyGetRequest,
  detailSuccess,
  detailFailure,
} = detailProductSlice.actions;
export default detailProductSlice.reducer;

const rootSelector = (state) => state[ROOT_STATE_NAME] || {};
export const detailByPropSelector = (prop) =>
  createSelector(rootSelector, (state) => state[prop]);

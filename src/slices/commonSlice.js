import { createSlice, createSelector } from "@reduxjs/toolkit";
import { COMMON } from "constants/props";

export const ROOT_STATE_NAME = "common";
const initialState = {
  [COMMON.category]: {
    status: "idle",
    data: {},
    error: "",
  },
  [COMMON.navCategory]: {
    status: "idle",
    data: {},
    error: "",
    isLoadMore: true,
  },
  [COMMON.brand]: {
    status: "idle",
    data: {},
    error: "",
  },
  [COMMON.navBrand]: {
    status: "idle",
    data: {},
    error: "",
    isLoadMore: true,
  },
  [COMMON.banner]: {
    status: "idle",
    data: {},
    error: "",
  },
  [COMMON.colorFilter]: {
    status: "idle",
    data: {},
    error: "",
  },
  [COMMON.brandFitler]: {
    status: "idle",
    data: {},
    error: "",
  },
};

const commonSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    commonGetRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    commonSuccess: (state, action) => {
      const { prop, data } = action.payload;

      data.docs =
        state[prop].isLoadMore && data.pagination.page > 1
          ? [...state[prop].data.docs, ...data.docs]
          : data.docs;

      state[prop] = {
        ...state[prop],
        status: "success",
        data,
        error: "",
      };
    },
  },
});

export const { commonGetRequest, commonSuccess } = commonSlice.actions;
export default commonSlice.reducer;

const rootSelector = (state) => state[ROOT_STATE_NAME] || {};
export const commonByPropSelector = (prop) =>
  createSelector(rootSelector, (state) => state[prop]);

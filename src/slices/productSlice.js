import { createSlice, createSelector } from "@reduxjs/toolkit";
import { PRODUCT } from "constants/props";

export const ROOT_STATE_NAME = "products";
const initialState = {
  [PRODUCT.hotProduct]: {
    status: "idle",
    data: {},
    error: "",
  },
  [PRODUCT.popularProduct]: {
    status: "idle",
    data: {},
    error: "",
  },
  [PRODUCT.main]: {
    status: "idle",
    data: {},
    error: "",
  },
};

const productSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    productGetRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    productSuccess: (state, action) => {
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

export const { productGetRequest, productSuccess } = productSlice.actions;
export default productSlice.reducer;

const rootSelector = (state) => state[ROOT_STATE_NAME] || {};
export const productsByPropSelector = (prop) =>
  createSelector(rootSelector, (state) => state[prop]);

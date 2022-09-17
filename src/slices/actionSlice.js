import { createSlice, createSelector } from "@reduxjs/toolkit";
import { ACTION } from "constants/props";

export const ROOT_STATE_NAME = "actions";
const initialState = {
  [ACTION.favouriteProduct]: {
    status: "idle",
    data: {},
    error: "",
  },
  [ACTION.order]: {
    status: "idle",
    data: {},
    error: "",
  },
};

const actionSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    actionGetRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    actionPostRequest: (state, action) => {
      state[action.payload.prop].status = "fetching";
      state[action.payload.prop].error = "";
    },
    actionSuccess: (state, action) => {
      const { prop } = action.payload;
      state[prop] = { status: "success" };
    },
    actionFailure: (state, action) => {
      const { prop } = action.payload;
      state[prop] = { status: "failure" };
    },
    actionClear: (state, action) => {
      const { prop } = action.payload;
      state[prop] = { status: "idle", data: {}, error: "" };
    },
  },
});

export const {
  actionGetRequest,
  actionPostRequest,
  actionSuccess,
  actionFailure,
  actionClear,
} = actionSlice.actions;
export default actionSlice.reducer;

const rootSelector = (state) => state[ROOT_STATE_NAME] || {};
export const actionByPropSelector = (prop) =>
  createSelector(rootSelector, (state) => state[prop]);

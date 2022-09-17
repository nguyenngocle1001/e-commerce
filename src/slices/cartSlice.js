import { createSlice } from "@reduxjs/toolkit";

export const ROOT_STATE_NAME = "cart";

const cartSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState: {
    status: "idle",
    data: {},
    error: "",
  },
  reducers: {
    cartGetRequest: (state, action) => {
      state.status = "fetching";
      state.error = "";
    },
    cartPostRequest: (state, action) => {
      state.status = "fetching";
      state.error = "";
    },
    cartDeleteRequest: (state, action) => {
      state.status = "fetching";
      state.error = "";
    },
    cartSuccess: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      state.error = "";
    },
    cartFailure: (state, action) => {
      state.status = "failure";
      state.data = action.payload.data;
      state.error = "";
    },
  },
});

export const {
  cartGetRequest,
  cartPostRequest,
  cartDeleteRequest,
  cartSuccess,
  cartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state) => state[ROOT_STATE_NAME] || [];

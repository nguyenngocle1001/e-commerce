import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import commonReducer, { ROOT_STATE_NAME as common } from "slices/commonSlice";
import authReducer, { ROOT_STATE_NAME as auth } from "slices/authSlice";
import productReducer, {
  ROOT_STATE_NAME as product,
} from "slices/productSlice";
import actionReducer, { ROOT_STATE_NAME as action } from "slices/actionSlice";
import detailReducer, { ROOT_STATE_NAME as detail } from "slices/detailSlice";
import cartReducer, { ROOT_STATE_NAME as cart } from "slices/cartSlice";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [common]: commonReducer,
    [auth]: authReducer,
    [product]: productReducer,
    [action]: actionReducer,
    [detail]: detailReducer,
    [cart]: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
